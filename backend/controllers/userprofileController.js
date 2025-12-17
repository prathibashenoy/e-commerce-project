import UserProfile from "../models/userProfile.js";
import User from "../models/Users.js";
import { sendProfileCompletedEmail } from "../utils/sendEmail.js";

export const createUserProfiles = async (req, res) => {
  try {
    const { userId } = req.params;
    const { Phone, Dob, Gender } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exists = await UserProfile.findOne({ userId });
    if (exists) return res.status(400).json({ message: "Profile exists" });

    const profile = await UserProfile.create({
      userId,
      Phone: Phone,
      Dob: Dob,
      Gender: Gender,
    });

    // SEND EMAIL AFTER PROFILE COMPLETION
    await sendProfileCompletedEmail(user);

    res.status(201).json({ message: "Profile created", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
