'use client';

// import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { Locales } from '@/i18n';
import { useRouter, usePathname, cn, dir } from '@/lib/util';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  className,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const t = useTranslations('common');
  // const params = useParams();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        pathname,
        { locale: nextLocale }
      );
    });
  }

  return (
    <div
      className={cn(
        'relative',
        className,
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <Select
        dir={dir(defaultValue)}
        defaultValue={defaultValue}
        disabled={isPending}
        onValueChange={onSelectChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {Locales.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {t('localeSwitcher.locale', { locale: cur })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}