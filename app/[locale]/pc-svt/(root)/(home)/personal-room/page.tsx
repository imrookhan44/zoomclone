import React from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { useTranslations } from 'next-intl';
import ProtectedPagepcsvt from '@/components/Protectedpagepcsvt';

export default function PersonalRoom() {
  const t = useTranslations(); // Initialize the useTranslations hook

  return (
    // pages/personal-room.js

    <ProtectedPagepcsvt>
      <section className="flex size-full flex-col gap-10 text-white">
        <h1 className="text-3xl font-extrabold">
          {t('personalRoomTitle')} {/* Use the translation key */}
        </h1>
      </section>
    </ProtectedPagepcsvt>
  );
}
