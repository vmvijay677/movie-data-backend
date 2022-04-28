import express from "express";
import { auth } from "../auth.js";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async function (req, res) {
    //db.movies.insertMany(data)
    const data = req.body;
    //console.log(data);
    const result = await client
        .db("b30wd")
        .collection("movieapp")
        .insertMany(data);
    res.send(result);
});

router.get("/", async function (req, res) {
    //db.movies.find({})
    const movies = await client
        .db("b30wd")
        .collection("movieapp")
        .find({})
        .toArray();
    res.send(movies);
})

router.put("/:id", auth, async function (req, res){
    //db.movies.updateOne
    const { id } = req.params;
    const updatedData = req.body;
    const result = await client
        .db("b30wd")
        .collection("movieapp")
        .updateOne({ _id: ObjectId(id) }, { $set: updatedData });
    res.send(result);
})

router.delete("/:id", auth, async function (req, res){
    //db.movies.deleteOne
    const { id } = req.params;
    const result = await client
        .db("b30wd")
        .collection("movieapp")
        .deleteOne({ _id: ObjectId(id) });
    res.send(result);
})

export const movieRouter = router;
