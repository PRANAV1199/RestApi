const express = require('express');
const app = express()
const connectDB = require("./db/connect")
const product_routes = require("./routes/products");
require("dotenv").config()

const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{

  res.send("Hi i am live")
});


//Middle ware or to set router
// app.use("/",product_routes);

app.use("/api/products",product_routes);
connectDB(process.env.MONGODB_URL);
app.listen(PORT,()=>{
  console.log("Connected");
});