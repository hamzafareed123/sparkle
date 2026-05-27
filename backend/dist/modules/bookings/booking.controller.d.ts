import { Request, Response } from "express";
export declare const bookingController: {
    create: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    getById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    updateStatus: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    delete: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
};
