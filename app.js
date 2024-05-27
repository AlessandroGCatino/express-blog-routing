const express = require("express");
const app = express();
const path = require("path");
const router = require("./routers/posts.js");

app.use(express.static('./public'));

app.get("/", (req, res) => {
    const homepage = path.join(__dirname, "./index.html")
    res.sendFile(homepage);
})

app.use("/posts", router)


app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});