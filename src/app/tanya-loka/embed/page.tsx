import SupportChat from '@/components/site/SupportChat';
import { getAppRequest } from '@/data/cta';
import { siteLinks } from '@/data/site/links';

export default function ChatEmbedPage() {
  const links = siteLinks('id');

  return (
    <SupportChat locale="id" embedded links={{
      pricing: links.harga,
      register: links.register,
      download: links.download,
      guide: links.panduan,
      faq: links.faq,
      whatsapp: links.whatsapp(getAppRequest('id').whatsappMessage),
    }} />
  );
}
