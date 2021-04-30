import { error } from "../middleware/error";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import router from "../routes";
import path from "path";
import fs from "fs";
import { Application, json } from "express";

const routes = (app: Application) => {

	const accessLogStream = fs.createWriteStream(path.join(__dirname, "../http.log"), { flags: "a" });
	app.use(morgan("combined", { stream: accessLogStream }));

	app.use(helmet());
	app.use(cors());
	app.use(json());
	app.use("/api", router);
	app.use(error);
};
export { routes };

