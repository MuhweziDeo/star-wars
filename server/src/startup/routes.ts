import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import { Application, json, Response, Request, NextFunction  } from "express";
import winston from "winston";

const error = (err: Error, req: Request, res: Response, next: NextFunction): void => {
	winston.error(`${err.message} `, err);
	res.status(500).send(`Err: 500, Someting went Wrong, ${err}`);
};

const routes = (app: Application) => {
	const accessLogStream = fs.createWriteStream(path.join(__dirname, "../http.log"), { flags: "a" });
	app.use(morgan("combined", { stream: accessLogStream }));
	app.use(helmet());
	app.use(cors());
	app.use(json());
	app.use(error);
};
export { routes, error };

