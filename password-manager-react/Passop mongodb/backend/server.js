const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()
require('dotenv').config()
const port = 3002
const cors = require('cors')
const { ObjectId } =require("mongodb");



app.use(cors());
app.use(express.json());


async function startServer() {

    const connectionString = process.env.MONGO_URI || "";
    const client = new MongoClient(connectionString);
    let conn;
    try {
        conn = await client.connect().then(() => console.log("Connection was successfull!!")).catch((e) => console.log("Error occurred while connectiong to mongodb"));
    } catch (e) {
        console.error(e);
    }
    const db = client.db("passop");
    const collection = db.collection("passwords");

    //For getting the passwords
    app.get("/", async (req, res) => {
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    })

    //For creating the passwords
    app.post("/", async (req, res) => {
        const val = req.body;
        const insertResult = await collection.insertOne(val);
        res.json({ status: true ,result:"Added successfully"});
    })

    //For deleting the Passwords
    app.delete("/", async (req, res) => {
        const val = req.body;
        const insertResult = await collection.deleteOne(val);
        res.json({ status: true, result: insertResult });
    })

    // ...existing code...
    app.put("/:id", async (req, res) => {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ status: false, error: "Invalid ID format" });
        }

        const updatedDoc = req.body;
        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedDoc }
            );
            res.json({ status: true, result });
        } catch (error) {
            res.status(500).json({ status: false, error });
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening on http://localhost:${port}`)
    })
}
startServer();
