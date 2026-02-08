import { connectDB } from "./db.js";
import User from "../backend/server/models/User.js";

export default async function handler(req, res) {
  try {
    await connectDB();

    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Users API Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
