import { z } from 'zod';
export declare const createBookingSchema: z.ZodObject<{
    customerName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    serviceType: z.ZodString;
    address: z.ZodString;
    preferredDate: z.ZodEffects<z.ZodString, string, string>;
    preferredTime: z.ZodString;
    specialNotes: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    email: string;
    customerName: string;
    phone: string;
    serviceType: string;
    address: string;
    preferredDate: string;
    preferredTime: string;
    price: number;
    specialNotes?: string | undefined;
}, {
    email: string;
    customerName: string;
    phone: string;
    serviceType: string;
    address: string;
    preferredDate: string;
    preferredTime: string;
    price: number;
    specialNotes?: string | undefined;
}>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]>;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}, {
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}>;
