import express from "express";
import bodyParser from "body-parser";
import { SqliteDatabase } from "./database";

const app = express();
const db = new SqliteDatabase();
const port = 8080;

app.use(bodyParser.text());

app.get('/paste/:hash', (req, res) =>
    db.getUri(req.params.hash)
        .then(uri => res.send(uri), reason => {
            if (reason === "No such paste.") {
                res.sendStatus(404);
            } else {
                res.status(500).send(reason);
            }
        })
);

app.put('/paste/:hash', (req, res) =>
    db.putUri(req.params.hash, req.body)
        .then(v => res.sendStatus(200), reason => res.status(500).send(reason))
);

app.listen(port, () => console.log(`Listening on port ${port}.`));
