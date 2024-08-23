import { useRouter } from 'next/router';

function useTranslation() {
  const router = useRouter();

  // Safeguard to handle cases where useRouter might be called too early
  if (!router.isReady) {
    return { t: (key: any) => key }; // Return keys as fallback translations
  }

  const { locale } = router;
  try {
    const translation = require(`../public/locales/${locale}/common.json`);
    return { t: (key: any) => translation[key] ?? key };
  } catch (error) {
    console.error('Failed to load translations:', error);
    return { t: (key: any) => key }; // Fallback to returning the key itself if the translation file fails to load
  }
}
