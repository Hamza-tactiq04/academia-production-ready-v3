import { useAuth } from "@/_core/hooks/useAuth";
import { useLocale } from "@/contexts/LocaleContext";
import { localeMeta, locales } from "@/lib/i18n";
import { Bell, CalendarDays, ChartNoAxesCombined, ChevronDown, ClipboardList, FilePenLine, FileText, Images, LayoutDashboard, Menu, Send, ShieldCheck, SlidersHorizontal, Trophy, UserPlus, Users, UsersRound, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { trpc } from "@/lib/trpc";

type ShellProps = { children: React.ReactNode; title: string; description?: string };

export default function AppShell({ children, title, description }: ShellProps) {
  const { user, logout } = useAuth();
  const { locale, setLocale, t } = useLocale();
  const [location] = useLocation();
  const { data: roleData } = trpc.academy.role.useQuery();
  const { data: notificationItems } = trpc.academy.notifications.useQuery();
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = roleData?.role ?? (user?.role === "admin" ? "admin" : null);

  const baseNav = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/players", label: t("players"), icon: Users },
    { href: "/player-gallery", label: t("playerGallery"), icon: Images },
    { href: "/teams", label: t("teams"), icon: UsersRound },
    { href: "/training", label: t("training"), icon: CalendarDays },
    { href: "/calendar", label: t("unifiedCalendar"), icon: CalendarDays },
    { href: "/tasks", label: t("taskBoard"), icon: ClipboardList },
    { href: "/activity", label: t("assessments"), icon: Trophy },
    { href: "/performance", label: t("performanceEntries"), icon: ChartNoAxesCombined },
    { href: "/analytics", label: t("analytics"), icon: ChartNoAxesCombined },
    { href: "/operations", label: t("operations"), icon: ClipboardList },
    { href: "/reports", label: t("reports"), icon: FileText },
    { href: "/documents", label: t("documents"), icon: FileText },
    { href: "/parent-invitations", label: t("parentInvitations"), icon: Send },
    { href: "/registrations", label: t("registrationForms"), icon: UserPlus },
    { href: "/custom-fields", label: t("customFields"), icon: SlidersHorizontal },
    { href: "/workflow-rules", label: t("workflowRules"), icon: Zap },
    { href: "/absence-messages", label: t("absenceMessaging"), icon: FilePenLine },
    { href: "/audit", label: t("auditLog"), icon: ShieldCheck },
    { href: "/settings", label: t("settings"), icon: SlidersHorizontal },
  ];
  const nav = role === "player" || role === "parent"
    ? baseNav.filter(item => item.href === "/")
    : baseNav.filter(item => role === "admin" || !["/analytics", "/documents", "/parent-invitations", "/registrations", "/custom-fields", "/workflow-rules", "/absence-messages", "/audit", "/settings"].includes(item.href));

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#103b37] text-white">
      <div className="flex h-[88px] items-center gap-3 px-5">
        <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-[#d8f04a] shadow-[0_10px_25px_rgba(216,240,74,.18)]">
          <img src="/academia-logo.svg" alt="أكاديميا" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-extrabold tracking-tight">{t("appName")}</p>
          <p className="truncate text-[11px] font-medium text-white/55">{t("academy")}</p>
        </div>
      </div>

      <div className="mx-4 mb-5 rounded-2xl border border-white/10 bg-white/[.055] p-3">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[.16em] text-white/45 uppercase">
          <ShieldCheck className="h-3.5 w-3.5" /> {t("role")}
        </div>
        <p className="text-sm font-bold">{role ? t(role === "admin" ? "administrator" : role) : t("profile")}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map(item => {
          const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-all ${active ? "bg-[#d8f04a] text-[#103b37] shadow-sm" : "text-white/65 hover:bg-white/8 hover:text-white"}`}>
              <item.icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl bg-[#0a2e2b] p-3.5">
        <p className="text-xs font-bold text-white">{user?.name || t("profile")}</p>
        <p className="mt-1 truncate text-[11px] text-white/45">{user?.email || "—"}</p>
        <button onClick={logout} className="mt-3 text-xs font-bold text-[#d8f04a] transition-opacity hover:opacity-75">{t("signOut")}</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f6ef] text-[#153531]">
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-[278px] lg:block"><SidebarContent /></aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button aria-label="Open menu" className="fixed start-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-xl bg-[#103b37] text-white shadow-lg lg:hidden"><Menu className="h-5 w-5" /></button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[278px] border-0 p-0 [&>button]:z-50 [&>button]:text-white"><SidebarContent /></SheetContent>
      </Sheet>

      <main className="min-h-screen min-w-0 lg:ms-[278px]">
        <header className="sticky top-0 z-10 border-b border-[#dce2d8] bg-[#f5f6ef]/90 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4 ps-12 lg:ps-0">
            <div>
              <p className="text-xs font-bold tracking-[.16em] text-[#71918c] uppercase">{t("academy")}</p>
              <h1 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h1>
              {description ? <p className="mt-1 hidden text-sm text-[#74908b] sm:block">{description}</p> : null}
            </div>
            <div className="flex items-center gap-2">
              <label className="relative hidden sm:block">
                <span className="sr-only">{t("language")}</span>
                <select value={locale} onChange={event => setLocale(event.target.value as typeof locale)} className="appearance-none rounded-xl border border-[#dce2d8] bg-white py-2 pe-8 ps-3 text-xs font-bold text-[#385853] outline-none transition focus:border-[#739c42]">
                  {locales.map(item => <option key={item} value={item}>{localeMeta[item].label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6d8782]" />
              </label>
              <Link href="/notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#dce2d8] bg-white text-[#355752] transition hover:border-[#b9d357] hover:text-[#103b37]" aria-label={t("notifications")}>
                <Bell className="h-[18px] w-[18px]" />
                {notificationItems?.some(item => !item.readAt) ? <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-[#d8f04a] ring-2 ring-white" /> : null}
              </Link>
              <div className="hidden h-10 max-w-40 items-center gap-2 rounded-xl border border-[#dce2d8] bg-white px-2.5 sm:flex">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#dcebc7] text-[10px] font-extrabold text-[#355d21]">{user?.name?.slice(0, 1).toUpperCase() || "A"}</span>
                <span className="truncate text-xs font-bold">{user?.name || t("profile")}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="min-w-0 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
