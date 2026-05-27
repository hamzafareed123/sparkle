import { Request, Response } from 'express';
export declare const serviceController: {
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    getAllForAdmin: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    getBySlug: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    create: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    update: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    delete: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
};
