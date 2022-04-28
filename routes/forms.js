import express from "express";
import { client } from "../index.js";

const router = express.Router();

router.post("/", async function (req, res) {
    //db.movies.insertMany(data)
    const data = req.body;
    //console.log(data);
    const result = await client
        .db("b30wd")
        .collection("forms")
        .insertMany(data);
    res.send(result);
});

router.get("/", async function (req, res) {
    //db.movies.find({})
    const data = await client
        .db("b30wd")
        .collection("forms")
        .find({})
        .toArray();
    res.send(data);
})

export const formsRouter = router;