const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const Pokedex = require("pokedex-promise-v2");
const MongoClient = require("mongodb").MongoClient;
const dummyData = [];

for (let i = 0; i < 100; i++) {
    const temp = {
        avatar: "https://pokeapi.co/media/sprites/pokemon/back/female/12.png",
        types: ["grass", "football", "sport"],
        name: `balbusaur${i}`,
        isFav: false
    };
    dummyData.push(temp);
}

const app = express();
const options = {
    protocol: "https",
    timeout: 10 * 1000 // 5s
};

// Mongo url
const mongoUrl =
    "mongodb://vikasmLab:9440926435@ds237748.mlab.com:37748/pokedex";
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
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// Rest api's
app.put("/favourite/:userId", async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.param("userId");
        let client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);
        const user = await db
            .collection("favourites")
            .findOne({ userId: userId });
        let update, insert;
        if (user) {
            update = await db
                .collection("favourites")
                .update({ userId: userId }, { $addToSet: { names: name } });
        } else {
            insert = await db
                .collection("favourites")
                .insert({ userId: userId, names: [name] });
        }
        client.close();
        if (update || insert) {
            console.log("Created");
            res.status(200).send({ status: 200, message: "Created" });
        } else {
            console.log("Bad Request");
            res.status(400).send({ status: 400, message: "Bad Request" });
        }
    } catch (exc) {
        console.log(exc);
        res.status(500).send({ status: 500, message: "Internal server error" });
    }
});

app.put("/unFavourite/:userId", async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.param("userId");
        let client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);
        const update = await db
            .collection("favourites")
            .update({ userId: userId }, { $pull: { names: name } });
        client.close();
        if (update) {
            console.log("Updated");
            res.status(200).send({ status: 200, message: "Updated" });
        } else {
            console.log("Bad Request");
            res.status(400).send({ status: 400, message: "Bad Request" });
        }
    } catch (exc) {
        console.log(exc);
        res.status(500).send({ status: 500, message: "Internal server error" });
    }
});

// app.post("/", async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const resp = await P.getPokemonsList(req.body.params);
//         if (resp && resp.results) {
//             const data = [];
//             let client = await MongoClient.connect(mongoUrl);
//             const db = client.db(dbName);
//             const doc = await db
//                 .collection("favourites")
//                 .findOne({ userId: userId });
//             client.close();
//             const favs = doc && doc.names ? doc.names : [];
//             for (let poke of resp.results) {
//                 const rawData = await P.getPokemonByName(poke.name);
//                 const types = [];
//                 if (rawData && rawData.types) {
//                     rawData.types.forEach((type) => {
//                         types.push(type.type.name);
//                     });
//                 }
//                 data.push({
//                     avatar: rawData.sprites.front_default,
//                     types: types,
//                     name: poke.name,
//                     isFav: favs.indexOf(poke.name) > -1
//                 });
//             }
//             res.send(data);
//         }
//     } catch (exc) {
//         console.log(exc);
//         res.status(500).send({ status: 500, message: "Internal server error" });
//     }
// });

app.post("/", async (req, res) => {
    try {
        const { userId, params } = req.body;
        res.send(dummyData.slice(params.offset, params.limit + params.offset));
    } catch (exc) {
        console.log(exc);
        res.status(500).send({ status: 500, message: "Internal server error" });
    }
});

// https
//     .createServer(
//         {
//             key: fs.readFileSync("./key.pem"),
//             cert: fs.readFileSync("./cert.pem")
//         },
//         app
//     )
//     .listen(PORT, () => {
//         console.log(`Your server is running on port -- ${PORT}`);
//     });

console.log(`Your server is running on port -- ${PORT}`);
app.listen(PORT);
