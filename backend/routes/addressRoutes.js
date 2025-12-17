//routes/addrerssRoutes.js

import express from "express";
import { addAddress,
         deleteAddress,
         getAllAddress,
         getUserAddress,
         updateAddress 
        } from "../controllers/addressController.js";
const AddressRouter=express.Router();

//@route POST /api/address
//@desc Create address
AddressRouter.post("/:userId",addAddress);

//@route GET /api/address/getAllAddresses
//@desc Get All User address
AddressRouter.get("/getAllAddress",getAllAddress);

//@route GET /api/address/:userId
//@desc Get User address
AddressRouter.get("/:userId",getUserAddress);

//@route PUT /api/address/:addressId
//@desc Update User address
AddressRouter.put("/:addressId",updateAddress);

//@route DELETE /api/address/:addressId
//@desc Delete User address
AddressRouter.delete("/:addressId",deleteAddress);

export default AddressRouter;