import { Request, Response } from 'express';
export declare const paymentController: {
    createIntent: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    confirmPayment: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    createRemainingIntent: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    webhook: (req: Request, res: Response) => Promise<void>;
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    refund: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
};
