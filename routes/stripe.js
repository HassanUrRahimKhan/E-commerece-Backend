const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51KqYGFCpPi8IDrPcWDFmOeavzJ2aUoIVZsBfPQ7qfcBUot2LNly3znmex7cPjNpqALiYID5gFMBq92RIiJS93mfz00fCqacLOE');
console.log(process.env.STRIPE_KEY)
router.post("/payment", (req,res) =>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }
        else{
            res.status(200).json(stripeRes)
        }
    })
})

module.exports = router;