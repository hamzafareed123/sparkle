import { z } from 'zod';
export declare const contactSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    email: string;
    name: string;
    phone?: string | undefined;
}, {
    message: string;
    email: string;
    name: string;
    phone?: string | undefined;
}>;
