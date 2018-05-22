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

// Use connect method to connect to the server
// MongoClient.connect(mongoUrl, function(err, client) {
//     console.log("Connected successfully to mongo");

//     db = client.db(dbName);
//     mongo = client;
//     const collection = db.collection("test");
//     // Find some documents
//     collection.find({}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.log(docs);
//     });
// });

// middlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Rest api's
app.post("/", async (req, res) => {
    console.log("res", res);
    try {
        const resp = await P.getPokemonsList({
            limit: 10,
            offset: 0
        });
        if (resp && resp.results) {
            const data = [];
            // let client = await MongoClient.connect(mongoUrl);
            // console.log("Connected correctly to server");

            // const db = client.db(dbName);

            // let r = await db
            //     .collection("test")
            //     .find({})
            //     .toArray(function(err, docs) {
            //         console.log("Found the following records");
            //         console.log(docs);
            //         data.push(docs);
            //     });
            // client.close();
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
