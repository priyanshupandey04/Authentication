const express = require("express");

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
        const token = generateRandon()
        userPresence.token = token;
        console.log(user);
        res.status(200).send("you are succesfully signed in")
    }

})

app.get('/me', function (req, res) {
    const token = req.headers.token;

    const userPresence = user.find(ele => ele.token == token)

    if (!userPresence) {
        res.status(403).send("Unautorized user!!, first signup/signin.")
    } else {
        res.status(200).json({
            username: userPresence.username,
            password: userPresence.password
        })
    }
})


function generateRandon() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let str = "";

    for (let i = 0; i < 32; i++) {
        str += options[Math.floor(options.length * Math.random())]
    }
    return str;
}

app.listen(3000, () => {
    console.log(`continously lsitening in port ${3000}`);
})
