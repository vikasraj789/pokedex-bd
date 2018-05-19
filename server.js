const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => {
    res.send({ hello: "world" });
});
app.listen(PORT);
console.log(`Your server is running on port -- ${PORT}`);
