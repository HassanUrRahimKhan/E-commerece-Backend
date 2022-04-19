
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJs = require("crypto-js");
const Order = require("../models/Order");
const router = require("express").Router();


//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });






//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body
        }, 
            { new: true }
            );
        res.status(200).json(updatedOrder);


    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("order has been deleted....")

    } catch (error) {
        res.status(500).json(error)
    }
})


//GET USER ORDERS

router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.id})

       
        res.status(200).json({orders});

    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL

    router.get("/", verifyTokenAndAdmin, async (req,res)=>{

        try {

            const orders = await Order.find()
            res.status(200).json(orders);


        } catch (error) {
            res.status(500).json(error)
        }
    })



module.exports = router