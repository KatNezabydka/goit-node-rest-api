import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import sequelize from "./config/db_connection.js";
import Contact from './models/contact.js';

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
    res.status(404).json({message: "Route not found"});
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
});


try {
    await sequelize.authenticate()
    console.log("✅ Database connection successful")

    // await sequelize.sync({ alter: true });
    // console.log("✅ All models were synchronized");

} catch (e) {
    console.log("❌ Database connection error: ", e)
    process.exit(1)
}

