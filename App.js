import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/ContactRouter.js";
import authRouter from "./routes/AuthRouter.js";

class App {
    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    setupMiddlewares() {
        this.app.use(morgan("tiny"));
        this.app.use(cors());
        this.app.use(express.json());
    }

    setupRoutes() {
        this.app.use("/api/auth", authRouter);
        this.app.use("/api/contacts", contactsRouter);
    }

    setupErrorHandling() {
        this.app.use((_, res) => {
            res.status(404).json({message: "Route not found"});
        });

        this.app.use((err, req, res, next) => {
            const {status = 500, message = "Server error"} = err;
            res.status(status).json({message});
        });
    }

    getInstance() {
        return this.app;
    }
}

export default App;