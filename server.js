const express = require("express");
const bodyParser = require("body-parser");
const Pokedex = require("pokedex-promise-v2");

const app = express();
const options = {
    protocol: "https",
    timeout: 5 * 1000 // 5s
};
const P = new Pokedex(options);
const PORT = process.env.PORT || 3030;

// middlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Rest api's
app.get("/", async (req, res) => {
    const res = await P.getPokedexsList();
    const data = await res.json();
    res.send(data);
});

console.log(`Your server is running on port -- ${PORT}`);
app.listen(PORT);
