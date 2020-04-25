const express = require("express");

const {
    getDomains
} = require("@sesamestrong/domain-startup");

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(require("cors")());

const proxyCycler = require("@sesamestrong/proxy-user").proxify(1);

app.get("/ping",(_,res)=>res.json({ok:true}));

app.post("/setup", async (req, res) => {
    console.log(req.cookies);
    ["bearerToken", "cfAccountId", "herokuApiKey", "username", "password"].forEach(name => req.body[name] ? res.cookie(name, req.body[name]) : null);
    res.json(await getDomains({
        ...req.cookies, ...req.body,
        proxy: await proxyCycler(),
    }));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening on port", port));
