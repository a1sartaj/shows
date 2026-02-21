import cron from "node-cron";
import { generateShows } from "../services/generateShows.js";

cron.schedule("0 2 * * *", async () => {

    try {
        await generateShows();
    } catch (error) {
        console.error("Cron error:", error);
    }
});

