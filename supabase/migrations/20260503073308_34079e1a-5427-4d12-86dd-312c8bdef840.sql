-- Fix update_updated_at search_path
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Restrict has_role execution
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;

-- Replace broad storage SELECT with read-by-path only (public bucket urls still work);
-- restrict listing to admins
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;

CREATE POLICY "Admins can list product images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));