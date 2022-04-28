import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import { formsRouter } from "./routes/forms.js";
import { usersRouter } from "./routes/authusers.js";
import { movieRouter } from "./routes/movieapp.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = 4000;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected 👍");
    return client;
}
export const client = await createConnection();

app.get("/", function(req, res) {
    res.send("<h1>Hello World</h1>");
});

app.use("/forms-data", formsRouter);

app.use("/users", usersRouter);

app.use("/movies", movieRouter);

app.listen(port, () => {
    console.log(`Server started in ${port}`);
});