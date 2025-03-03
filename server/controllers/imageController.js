import { Types } from "mongoose";
import userModel from "../models/userModel.js";
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        if (!userId || !prompt) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: 'No credit balance', creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                ...formData.getHeaders(),  
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        const updatedBalance = user.creditBalance - 1;
        await userModel.findByIdAndUpdate(user._id, { creditBalance: updatedBalance });

        res.json({ success: true, message: "Image Generated", creditBalance: updatedBalance, resultImage });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
