"use client"

import * as React from "react"
import { useFormState } from 'react-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import { testSchema } from "@/server/schema"
import { testAction } from "@/server/actions"
import { Button } from "@/components/ui/button"
import { State } from "@/types/form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface TestFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function TestForm({ className, ...props }: TestFormProps) {
    const [formState, formAction] = useFormState<State, FormData>(testAction, null);
    const [pending, startTransition] = React.useTransition();
    const formRef = React.useRef<HTMLFormElement>(null);

    const t = useTranslations("validations");
    const formSchema = testSchema(t);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            ...(formState?.fields ?? {}),
        },
        errors: formState?.errors,
        progressive: true,
    })

    React.useEffect(() => {
        if (!formState) {
            return;
        }
        if (formState.status === "error" && formState.message) {
            toast.error(formState.message)
        }
        if (formState.status === "success" && formState.message) {
            toast.success(formState.message)
        }
    }, [formState, form]);

    return (
        <Form {...form}>

            <form
                ref={formRef}
                action={formAction}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    form.handleSubmit(() => {
                        startTransition(() => formAction(new FormData(formRef.current!)));
                    })(evt);
                }}
                className="grid gap-4"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t('fields.email')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={pending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{t('fields.password')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                            type="password"
                                            autoComplete="password"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={pending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="w-full" disabled={pending}>{t('buttons.submit')}</Button>
                </div>
            </form>
        </Form>
    )


}