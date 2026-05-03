import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";

const Auth = () => {
  const { lang } = useLang();
  const fa = lang === "fa";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast({
          title: fa ? "ثبت‌نام انجام شد" : "Account created",
          description: fa
            ? "اکنون با ایمیل تأیید فعال شوید سپس وارد شوید."
            : "Please verify your email if required, then log in.",
        });
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin", { replace: true });
      }
    } catch (err: any) {
      toast({
        title: fa ? "خطا" : "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-16 md:py-24 min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 shadow-soft">
        <h1 className="font-display text-3xl text-primary mb-2 text-center">
          {fa ? "ورود مدیر" : "Admin Login"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {fa ? "برای مدیریت محصولات وارد شوید" : "Sign in to manage products"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">{fa ? "ایمیل" : "Email"}</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">{fa ? "رمز عبور" : "Password"}</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "..." : mode === "login" ? (fa ? "ورود" : "Sign In") : (fa ? "ثبت‌نام" : "Sign Up")}
          </Button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-6 text-sm text-muted-foreground hover:text-primary w-full text-center"
        >
          {mode === "login"
            ? fa ? "حساب ندارید؟ ثبت‌نام کنید" : "No account? Sign up"
            : fa ? "حساب دارید؟ وارد شوید" : "Have an account? Sign in"}
        </button>
      </div>
    </section>
  );
};

export default Auth;
