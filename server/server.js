import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './CONFIG/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4040
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/',(req,res)=> res.send("server is running"))

app.listen(PORT, ()=> console.log('Server Running on Port'+PORT));
app.post("/api/user/pay-razor", async (req, res) => {
try {
    const { planId } = req.body;
    console.log("Received Plan ID:", planId);

    const plan = plan.find((p) => p.id === planId);
    if (!plan) {
    return res.status(400).json({ success: false, message: "Invalid plan ID" });
    }

    const options = {
      amount: plan.price * 100, 
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Order Created:", order);

    res.json({ success: true, order });
} catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ success: false, message: "Payment failed" });
}

});

