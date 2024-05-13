import { FieldErrors } from "react-hook-form";

export type formErrors = FieldErrors<Record<string, { type: string, message: string }>>

export type State =
    {
        status: "success" | "error";
        message?: string;
        fields?: Record<string, string>;
        errors?: formErrors
        extra?: any
    } | null;
