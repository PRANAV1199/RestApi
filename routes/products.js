const express = require('express')
const router = express.Router()

//Include path till .js file 
const controllers = require("../controllers/products")

router.route("/").get(controllers.getAllProducts);
router.route("/testing").get(controllers.getAllProductsTesting);
router.route("/finding").get(controllers.getAllProductsByFilter);

//For this route give url like : http://localhost:5000/api/products/findingReqQuery?company=apple 
//For multiple condition : http://localhost:5000/api/products/findingReqQuery?company=apple&featured=true
//This will not work here : http://localhost:5000/api/products/findingReqQuery?company=apple&bvs;fkmg;=vsd.v
router.route("/findingReqQuery").get(controllers.getAllProductsByFilterReqQuery);

//This will work here : http://localhost:5000/api/products/findingReqQuery?company=apple&bvs;fkmg;=vsd.v
router.route("/findingReqQueryObject").get(controllers.getAllProductsByFilterReqQueryObject);


// For Sort : http://localhost:5000/api/products/findingReqQueryObjectSelect?company=apple&sort=name,price

//For Sort,Select and condition  : http://localhost:5000/api/products/findingReqQueryObjectSelect?company=apple&sort=name,price&select=name,price
router.route("/findingReqQueryObjectSelect").get(controllers.getAllProductsByFilterReqQueryObjectSelect);



module.exports = router;