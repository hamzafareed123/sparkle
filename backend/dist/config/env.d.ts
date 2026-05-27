export declare const env: {
    port: string | number;
    nodeEnv: string;
    clientUrls: string[];
    mongoUri: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    stripe: {
        secretKey: string;
        webhookSecret: string;
    };
    email: {
        host: string;
        port: number;
        user: string;
        pass: string;
    };
};
