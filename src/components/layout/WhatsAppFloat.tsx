import { MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";

const WhatsAppFloat = () => {
  const { t } = useLang();
  return (
    <a
      href="https://wa.me/message/64F75TYQX77KI1"
      target="_blank"
      rel="noopener"
      aria-label={t("whatsapp")}
      className="fixed bottom-5 right-5 rtl:right-auto rtl:left-5 z-50 w-14 h-14 rounded-full grid place-items-center text-white shadow-elegant animate-float-pulse"
      style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppFloat;
