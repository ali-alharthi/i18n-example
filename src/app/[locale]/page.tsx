import { getLocale, getTranslations } from 'next-intl/server';

import { TestForm } from '@/components/forms/test-form';
import LocaleSwitcher from '@/components/locale-switcher';

export default async function IndexPage() {
  const t = await getTranslations('common')
  const locale = await getLocale()
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {t('title')}

      <TestForm />

      <LocaleSwitcher defaultValue={locale} label={t('localeSwitcher.label')} className={'mt-10'} />
    </main>
  );
}
