import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "../index.js";

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

async function genPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //console.log({ salt, hashedPassword });
    return hashedPassword;
}

router.post("/signup", async function (req, res) {
    //db.users.insertOne(data)
    const { username, password } = req.body;
    const hashedPassword = await genPassword(password);
    const newUser = {
        username: username,
        password: hashedPassword
    };
    //console.log(newUser);
    const result = await client
        .db("b30wd")
        .collection("authusers")
        .insertOne(newUser);
    res.send(result);
})

router.post("/login", async function (req, res){
    //db.users.findOne
    const { username, password } = req.body;
    const userFromDB = await client
        .db("b30wd")
        .collection("authusers")
        .findOne({ username: username });
    //console.log(userFromDB);

    if(!userFromDB){
        res.status(401).send({message: "Username or password is incorrect"});
        //console.log("Username or password is incorrect");
    } else{
        const storedPassword = userFromDB.password;     //hashed password
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);
        //console.log("Password match is", isPasswordMatch);
        if(isPasswordMatch){
            const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY);
            res.send({message: "Successful Login!!", token: token});
        } else{
            res.status(401).send({message: "Username or password is incorrect"});
            //console.log("Username or password is incorrect");
        }
    }
});

export const usersRouter = router;