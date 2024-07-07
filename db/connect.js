const mongoose = require("mongoose")
const { options } = require("../routes/products")

const connectDB = (uri) =>{
  console.log("Aagaya")
  return mongoose.connect(uri,{
    useNewUrlParser :true,
    useUnifiedTopology :true,
  });
}

module.exports = connectDB;