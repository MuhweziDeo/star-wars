import express, { Request } from 'express';
import winston from "winston";
import fs from 'fs';
import { error, routes } from '../routes';

describe("Routes", () => {
    afterAll(() => {
        jest.resetAllMocks();
    })
    it("test error()", () => {
       const spy = jest.spyOn(winston, "error").mockImplementationOnce(() => ({} as any));
        error(new Error("error"), {} as Request, {status: jest.fn(()=> ({
            send: jest.fn()
            }))} as any, () => {});
        expect(spy).toHaveBeenCalled();
    });

    it("test routes()", () => {
        const app = express();
        const fsSpy = jest.spyOn(fs, "createWriteStream").mockReturnValueOnce({} as any);
        const spy = jest.spyOn(app, "use");
        routes(app);
        expect(spy).toHaveBeenCalled();
        expect(fsSpy).toHaveBeenCalled();
    })
})