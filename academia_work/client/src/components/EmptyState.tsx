import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import { ClipboardPlus } from "lucide-react";

export function EmptyState({ action }: { action?: () => void }) {
  const { t } = useLocale();
  return <div className="grid min-h-[260px] place-items-center rounded-[28px] border border-dashed border-[#c8d5c6] bg-white px-6 text-center">
    <div className="max-w-sm">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf2e2] text-[#5c7f2c]"><ClipboardPlus className="h-5 w-5" /></div>
      <h3 className="mt-4 text-base font-extrabold text-[#173a35]">{t("noData")}</h3>
      <p className="mt-2 text-sm leading-6 text-[#78918c]">{t("noDataText")}</p>
      {action ? <Button onClick={action} className="mt-5 rounded-xl bg-[#103b37] px-4 text-white hover:bg-[#1c534d]">{t("addPlayer")}</Button> : null}
    </div>
  </div>;
}
