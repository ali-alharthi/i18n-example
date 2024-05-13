import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { Locales, LocalePrefix } from "@/i18n"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function dir(locale: string): 'rtl' | 'ltr' {
    return locale === 'ar' ? 'rtl' : 'ltr'
}


export function getValue<ObjectType, TargetType>(object: ObjectType, path: string): TargetType {
    const keys = path.split('.')
    let result: any = object
    for (const key of keys) {
        result = result[key]
    }
    return result as TargetType
}

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales: Locales, localePrefix: LocalePrefix });