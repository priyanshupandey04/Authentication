const express = require("express");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "abcd@1234";
const app = express()

app.use(express.json())

let user = []

app.post("/signup", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (user.find((ele) => ele.username == username)) {
        res.status(404).send("User already exists")
    } else {
        user.push({
            "username": username,
            "password": password
        })
        console.log(user);

        res.status(200).send("you are succesfully signed up")
    }
})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let userPresence = user.find(ele => ele.username == username);
    if (!userPresence) {
        res.status(404).send("User not found please first sign up!!")
    } else if (userPresence.password !== password) {
        return res.status(401).send("Incorrect password");
    } else {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        userPresence.token = token;
        console.log(user);
        res.status(200).send("you are succesfully signed in")
    }

})

app.get('/me', function (req, res) {
    const token = req.headers.token; 

    const userFound = jwt.verify(token, JWT_SECRET);
    const usernameOfUserFound = userFound.username
    const userPresence = user.find(ele => ele.username == usernameOfUserFound)

    if (!userPresence) {
        res.status(403).send("Unautorized user!!, first signup/signin.")
    } else {
        res.status(200).json({
            username: userPresence.username,
            password: userPresence.password
        })
    }
})

app.listen(3001, () => {
    console.log(`continously lsitening in port ${3001}`);
})
