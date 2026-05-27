import { Request, Response } from 'express';
export declare const testimonialController: {
    submit: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    getApproved: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    approve: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    delete: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
};
