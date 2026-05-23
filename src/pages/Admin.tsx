import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, LogOut, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";
import { SUBCATEGORIES } from "@/data/subcategories";
import type { Category } from "@/data/products";

interface DbProduct {
  id: string;
  name_fa: string;
  name_en: string;
  category: string;
  subcategory: string | null;
  brand: string;
  price: number;
  image_url: string | null;
  details_fa: string | null;
  details_en: string | null;
  shade: string | null;
  sort_order: number;
  discount_price: number | null;
}

const emptyForm: Omit<DbProduct, "id"> = {
  name_fa: "",
  name_en: "",
  category: "healthcare",
  subcategory: null,
  brand: "Dr.Biz",
  price: 0,
  image_url: null,
  details_fa: "",
  details_en: "",
  shade: "150 50% 35%",
  sort_order: 0,
  discount_price: null,
};
const CATEGORIES: Category[] = ["medicinal", "healthcare", "cosmetics", "food"];
const BRANDS = ["Dr.Biz", "Setin", "Biene Star", "Dynamin"];

const Admin = () => {
  const { lang } = useLang();
  const fa = lang === "fa";
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isAdmin, loading: authLoading } = useAdmin();

  const [items, setItems] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DbProduct | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!authLoading && !session) navigate("/auth", { replace: true });
  }, [authLoading, session, navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setItems((data ?? []) as DbProduct[]);
    setLoading(false);
  };

  useEffect(() => {
    if (session) load();
  }, [session]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm, sort_order: items.length });
    setOpen(true);
  };

  const openEdit = (p: DbProduct) => {
    setEditing(p);
    const { id, ...rest } = p;
    setForm(rest);
    setOpen(true);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast({ title: fa ? "آپلود شد" : "Uploaded" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name_fa.trim() || !form.name_en.trim() || form.price < 0) {
      toast({ title: fa ? "فیلدهای الزامی" : "Required fields", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = { ...form, price: Number(form.price), sort_order: Number(form.sort_order) };
    const { error } = editing
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: fa ? "ذخیره شد" : "Saved" });
    setOpen(false);
    load();
  };

  const handleDelete = async (p: DbProduct) => {
    if (!confirm(fa ? `حذف "${p.name_fa}"؟` : `Delete "${p.name_en}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: fa ? "حذف شد" : "Deleted" });
      load();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (authLoading) {
    return (
      <div className="container py-20 grid place-items-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) return null;

  // ✅ اصلاح: return اضافه شد و از بلوک تکراری جدا شد
  if (!isAdmin) {
    return (
      <section className="container py-16 max-w-xl">
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h1 className="font-display text-2xl text-primary mb-3">
            {fa ? "دسترسی محدود" : "Access restricted"}
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            {fa
              ? "حساب شما نقش مدیر ندارد. برای فعال‌سازی، شناسه کاربری زیر را در دیتابیس به جدول user_roles با نقش admin اضافه کنید."
              : "Your account is not an admin. Add your user ID below to the user_roles table with role=admin to enable access."}
          </p>
          <code className="block bg-muted px-3 py-2 rounded text-xs break-all mb-6">
            {session.user.id}
          </code>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="w-4 h-4" /> {fa ? "خروج" : "Sign Out"}
          </Button>
        </div>
      </section>
    );
  }

  // ✅ اصلاح: فقط یک بار تعریف می‌شود
  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);
  const subList = form.category ? SUBCATEGORIES[form.category as Category] ?? [] : [];

  return (
    <section className="container py-8 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-primary">
            {fa ? "پنل مدیریت محصولات" : "Product Admin"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length} {fa ? "محصول" : "products"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={openNew} className="gap-2">
            <Plus className="w-4 h-4" /> {fa ? "محصول جدید" : "New Product"}
          </Button>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="w-4 h-4" /> {fa ? "خروج" : "Sign Out"}
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          {fa ? "همه" : "All"}
        </Button>
        {CATEGORIES.map((c) => (
          <Button key={c} size="sm" variant={filter === c ? "default" : "outline"} onClick={() => setFilter(c)}>
            {c}
          </Button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">{fa ? "عکس" : "Image"}</TableHead>
                <TableHead>{fa ? "نام" : "Name"}</TableHead>
                <TableHead>{fa ? "دسته" : "Category"}</TableHead>
                <TableHead>{fa ? "قیمت" : "Price"}</TableHead>
                <TableHead className="text-end">{fa ? "عملیات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded bg-muted overflow-hidden">
                      {p.image_url && (
                        <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{p.name_fa}</div>
                    <div className="text-xs text-muted-foreground">{p.name_en}</div>
                  </TableCell>
                  <TableCell className="text-sm">{p.category}</TableCell>
                  <TableCell className="text-sm">{Number(p.price).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(p)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    {fa ? "محصولی یافت نشد" : "No products"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editing ? (fa ? "ویرایش محصول" : "Edit Product") : (fa ? "محصول جدید" : "New Product")}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>{fa ? "نام (فارسی) *" : "Name (Persian) *"}</Label>
                <Input value={form.name_fa} onChange={(e) => setForm({ ...form, name_fa: e.target.value })} />
              </div>
              <div>
                <Label>{fa ? "نام (انگلیسی) *" : "Name (English) *"}</Label>
                <Input value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>{fa ? "دسته‌بندی" : "Category"}</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v, subcategory: null })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{fa ? "زیرشاخه" : "Subcategory"}</Label>
                <Select value={form.subcategory ?? "_none"} onValueChange={(v) => setForm({ ...form, subcategory: v === "_none" ? null : v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_none">{fa ? "ندارد" : "None"}</SelectItem>
                    {subList.map((s) => <SelectItem key={s.key} value={s.key}>{s.name[lang]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{fa ? "برند" : "Brand"}</Label>
                <Select value={form.brand} onValueChange={(v) => setForm({ ...form, brand: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>{fa ? "قیمت (افغانی)" : "Price (AFN)"}</Label>
                <Input type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <div>
                <Label>{fa ? "ترتیب نمایش" : "Sort order"}</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </div>
            </div>
<div>
  <Label>{fa ? "قیمت تخفیف (افغانی)" : "Discount Price (AFN)"}</Label>
  <Input type="number" min={0} value={form.discount_price ?? ""} onChange={(e) => setForm({ ...form, discount_price: e.target.value === "" ? null : Number(e.target.value) })} />
</div>
            <div>
              <Label>{fa ? "تصویر محصول" : "Product image"}</Label>
              <div className="mt-2 flex items-start gap-3">
                <div className="w-24 h-24 rounded border border-border bg-muted overflow-hidden shrink-0">
                  {form.image_url && <img src={form.image_url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-sm border border-border rounded px-3 py-2 hover:bg-muted">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? (fa ? "در حال آپلود..." : "Uploading...") : (fa ? "انتخاب فایل" : "Choose file")}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUpload(f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  {form.image_url && (
                    <button type="button" onClick={() => setForm({ ...form, image_url: null })} className="text-xs text-destructive hover:underline block">
                      {fa ? "حذف عکس" : "Remove image"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label>{fa ? "توضیحات (فارسی)" : "Details (Persian)"}</Label>
              <Textarea rows={5} value={form.details_fa ?? ""} onChange={(e) => setForm({ ...form, details_fa: e.target.value })} />
            </div>
            <div>
              <Label>{fa ? "توضیحات (انگلیسی)" : "Details (English)"}</Label>
              <Textarea rows={5} value={form.details_en ?? ""} onChange={(e) => setForm({ ...form, details_en: e.target.value })} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {fa ? "انصراف" : "Cancel"}
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : fa ? "ذخیره" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Admin;
