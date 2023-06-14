import { Express } from 'express';
export declare const endpointsExtension: {
    name: string;
    extendApp: (ctx: {
        app: Express;
        configuration: any;
    }) => void;
};
