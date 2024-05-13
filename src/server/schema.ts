import { Formats, TranslationValues } from "next-intl"
import * as z from "zod"

export const testSchema = (t: (key: string, values?: TranslationValues | undefined, formats?: Partial<Formats> | undefined) => string) => z.object({
    email: z
        .string({
            required_error: t('required', { field: t('fields.email') })
        })
        .email({
            message: t('invalid', { field: t('fields.email') })
        }),
    password: z
        .string({
            required_error: t('required', { field: t('fields.password') })
        })
        .min(1, {
            message: t('required', { field: t('fields.password') })
        }),
})