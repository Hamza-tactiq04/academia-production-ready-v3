import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/contexts/LocaleContext";
import { trpc } from "@/lib/trpc";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function AdminLoginDialog() {
  const { t } = useLocale();
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = trpc.auth.loginWithPassword.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      setOpen(false);
      setPassword("");
      navigate("/");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl border-[#b8cdb0] bg-white text-[#315a52] hover:bg-[#f2f7ef]">
          <KeyRound className="me-2 h-4 w-4" />{t("adminLogin")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-[28px] bg-white p-6 sm:p-7">
        <DialogHeader>
          <div className="mb-2 grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf2e2] text-[#52772c]"><ShieldCheck className="h-6 w-6" /></div>
          <DialogTitle className="text-xl font-extrabold">{t("adminLogin")}</DialogTitle>
          <DialogDescription>{t("adminLoginDescription")}</DialogDescription>
        </DialogHeader>
        <form className="mt-4 space-y-4" onSubmit={event => { event.preventDefault(); login.mutate({ email, password }); }}>
          <div><Label>{t("email")}</Label><Input type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} className="mt-2 h-11 rounded-xl" /></div>
          <div><Label>{t("password")}</Label><Input type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} className="mt-2 h-11 rounded-xl" /></div>
          {login.error ? <p role="alert" className="rounded-xl bg-[#fff2ef] p-3 text-xs font-semibold text-[#a65d4f]">{t("invalidCredentials")}</p> : null}
          <Button disabled={login.isPending} className="h-11 w-full rounded-xl bg-[#103b37] text-white hover:bg-[#1a514a]">{login.isPending ? "…" : t("signIn")}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
