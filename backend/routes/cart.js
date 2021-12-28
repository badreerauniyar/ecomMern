const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router=require("express").Router();
const Cart=require("../models/Cart")

//create a Cart

router.post("/", verifyToken,async(req,res)=>{
    try{
        const newCart=await new Cart(req.body);
        newCart.save();
        res.status(200).json(newCart);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    }catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET user Cart
  router.get("/find/:id", verifyTokenAndAuthorization,async (req, res) => {
    try {
      const cart = await Cart.findOne({userId:req.params.id});
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get all
  router.get("/",verifyTokenAndAdmin,async(req,res)=>{
      try{
        const carts=await Cart.find()
        res.status(200).json(carts);
      }catch(err){
          res.status(500).json(err);
      }
  })
module.exports=router;