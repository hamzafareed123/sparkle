import { Request, Response } from 'express';
export declare const contactController: {
    submit: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    markAsRead: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    delete: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
};
