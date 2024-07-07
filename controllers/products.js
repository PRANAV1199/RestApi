//Fetch table schema every where we need 
const { query } = require("express");
const Product = require("../models/products")

const getAllProducts = async  (req,res)=>{

  const dataFetch = await Product.find({});
  res.status(200).json({dataFetch});
  // res.status(200).json({msg:"I am getAllProducts"});
}

const getAllProductsTesting = async  (req,res)=>{

  res.status(200).json({msg:"I am getAllProductsTesting"});
}

const getAllProductsByFilter = async  (req,res)=>{

  //.find() for condition and .sort() for asceding price
  const dataFetch = await Product.find({company:"apple"}).sort("price");
  //For descending price
  // const dataFetch = await Product.find({company:"apple"}).sort("--price");
  res.status(200).json({dataFetch});
  // res.status(200).json({msg:"I am getAllProducts"});
}

//Take input from users : http://localhost:5000/api/products/findingReqQuery?company=apple&featured=true
//This will not work here : http://localhost:5000/api/products/findingReqQuery?company=apple&bvs;fkmg;=vsd.v
const getAllProductsByFilterReqQuery = async  (req,res)=>{

  const dataFetch = await Product.find(req.query);
  console.log("Comapny Name ", req.query);
  res.status(200).json({dataFetch});
  // res.status(200).json({msg:"I am getAllProducts"});
}
// Take input from users : http://localhost:5000/api/products/findingReqQuery?company=apple&bvs;fkmg;=vsd.v *******This will work
const getAllProductsByFilterReqQueryObject = async  (req,res)=>{

  const {company,featured} = req.query;
  const queryObject = {}

  if(company){
    queryObject.company = company;
    console.log(queryObject.company);
  }
  //Add more like this for further additon of & condition
  // if(name){
  //   queryObject.name = name;
  //   console.log(queryObject.company);
  // }

  if(featured){
    queryObject.featured = featured;
    console.log(queryObject.featured);
  }
  // console.log("Comapny Name ", req.query);
  const myData = await Product.find(queryObject);
  res.status(200).json({myData});
  // res.status(200).json({msg:"I am getAllProducts"});
}


// For Sort : http://localhost:5000/api/products/findingReqQueryObjectSelect?company=apple&sort=name,price

//For Sort,Select and condition  : http://localhost:5000/api/products/findingReqQueryObjectSelect?company=apple&sort=name,price&select=name,price

const getAllProductsByFilterReqQueryObjectSelect = async  (req,res)=>{

  // 1.First find all the field which are present in the url for condition
  const { company, name, featured, sort, select } = req.query;
  console.log("🚀 ~ file: products.js ~ line 5 ~ getAllProducts ~ sort", sort);
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // 2.Find all the data on the basis of condition
  let apiData = Product.find(queryObject);
  //3. If sort is present do sorting
  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }
  
  //4.If select is present do select operation
  // (select = name company;
  if (select) {
    // let selectFix = select.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  //5. Wait for apiData need to come
  const myData = await apiData;
  res.status(200).json({myData});
}



module.exports = {getAllProducts,getAllProductsTesting,getAllProductsByFilter,getAllProductsByFilterReqQuery,getAllProductsByFilterReqQueryObject,getAllProductsByFilterReqQueryObjectSelect}