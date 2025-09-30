import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
const port=5002;
import phoneRoutes from "./routes/phoneRoutes.js"
import {fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/PhoneBook").then(()=>console.log("Mongo Db Connected ✅ ")).catch((err)=>{console.log(err)});

app.use("/api/phone",phoneRoutes);
app.use(express.static(path.join(__dirname, "client", "dist")));
// app.use(express.static(path.join(__dirname, "public")));



app.use('/',(req,res)=>{
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.listen(port,()=>{console.log(`🚀 Server running at http://localhost:${port}`);});
