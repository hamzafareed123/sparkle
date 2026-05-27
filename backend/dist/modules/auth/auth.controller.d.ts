import { Request, Response } from 'express';
export declare const authController: {
    register: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    login: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    getMe: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
};
