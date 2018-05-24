const express = require("express");
const bodyParser = require("body-parser");
const Pokedex = require("pokedex-promise-v2");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const options = {
    protocol: "https",
    timeout: 5 * 1000 // 5s
};
// Mongo url
const mongoUrl = "mongodb://vikasmLab:9440926435@ds237748.mlab.com:37748/pokedex";
const P = new Pokedex(options);
const PORT = process.env.PORT || 3030;
// Database Name
const dbName = "pokedex";
let db;
let mongo;

// middlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Rest api's
app.put("/favourite", async (req, res) => {
    console.log("in put");
    try {
        const { userId, name } = req.body;
        let client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);
        const user = await db.collection("favourites").findOne({ userId: userId });
        let update, insert;
        if (user) {
            update = await db.collection("favourites").update({ userId: userId }, { $addToSet: { names: [name] } });
        } else {
            insert = await db.collection("favourites").insert({ userId: userId, names: [name] });
            if (insert) console.log("inserted", insert);
        }
        client.close();
        if (update || insert) {
            res.status(200);
            res.send("Created");
        }
        res.status(400);
        res.send("Bad Request");
    } catch (exc) {
        console.log(exc);
    }
});

app.post("/", async (req, res) => {
    try {
        const resp = await P.getPokemonsList(req.body);
        if (resp && resp.results) {
            const data = [];
            for (let poke of resp.results) {
                const rawData = await P.getPokemonByName(poke.name);
                const types = [];
                if (rawData && rawData.types) {
                    rawData.types.forEach((type) => {
                        types.push(type.type.name);
                    });
                }
                data.push({
                    avatar: rawData.sprites.front_default,
                    types: types,
                    name: poke.name
                });
            }
            res.send(data);
        }
    } catch (exc) {
        console.log(exc);
    }
});

console.log(`Your server is running on port -- ${PORT}`);
app.listen(PORT);
