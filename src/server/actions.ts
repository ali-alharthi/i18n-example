'use server'

import { getTranslations } from "next-intl/server";
import { isRedirectError } from "next/dist/client/components/redirect";
import { isNotFoundError } from "next/dist/client/components/not-found";
import { ZodError } from 'zod';

import type { State, formErrors } from "@/types/form";
import { testSchema } from "./schema";

export async function testAction(
    prevState: State | null,
    formData: FormData,
): Promise<State> {

    const data = Object.fromEntries(formData);
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
        fields[key] = data[key].toString();
    }

    const messages = await getTranslations('messages')

    try {

        const t = await getTranslations('validations')
        const submission = testSchema(t).parse(data)

        return {
            status: "success",
            message: messages('toasts.success'),
        };

    } catch (error) {

        if (isNotFoundError(error)) {
            throw error;
        }


        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof ZodError) {
            const errors: formErrors = {}
            error.issues.map((issue) => {
                const key = issue.path.join(".").toString()
                errors[key] = {
                    type: issue.code,
                    message: issue.message
                }
            })

            return {
                status: "error",
                // message: "Validation error(s)",
                fields,
                errors: errors
            }
        }

        return {
            status: "error",
            message: messages('toasts.error'),
            fields,
        };
    }
}