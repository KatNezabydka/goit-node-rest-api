import App from "./App.js";
import sequelize from "./config/db_connection.js";
import "./models/index.js";

const PORT = process.env.PORT || 3000;

const appInstance = new App();

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");

        // await sequelize.sync({ alter: true });

        appInstance.getInstance().listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

start();