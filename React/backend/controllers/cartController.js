import userModel from "../models/userModel.js"

// ইউজারের কার্টে আইটেম যোগ করা
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || new Map();
        if (!cartData.has(req.body.itemId)) {
            cartData.set(req.body.itemId, 1);
        } else {
            cartData.set(req.body.itemId, cartData.get(req.body.itemId) + 1);
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// ইউজারের কার্ট থেকে আইটেম সরানো
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || new Map();
        if (cartData.has(req.body.itemId) && cartData.get(req.body.itemId) > 0) {
            cartData.set(req.body.itemId, cartData.get(req.body.itemId) - 1);
            if (cartData.get(req.body.itemId) === 0) {
                cartData.delete(req.body.itemId);
            }
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

// ইউজারের কার্টের ডেটা ফেচ করা
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || new Map();
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};

export { addToCart, removeFromCart, getCart };
