const express = require("express");

const {
    getDomains
} = require("@sesamestrong/domain-startup");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

express.use(require("cors")());

const proxyCycler = require("@sesamestrong/proxy-user").proxify(1);

app.post("/get",async (req, res) => 
    res.json(await getDomains({ ...req.body,
        proxy: await proxyCycler()
    });)
);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening on port", port));
