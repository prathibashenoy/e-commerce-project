// controllers/addressController.js

import Address from "../models/Address.js";
import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { successResponse, errorResponse } from "../constants/response.js";
import User from "../models/Users.js";

// 🏠 Create a new address
export const addAddress = async (req, res) => {
 try {
    const { userId } = req.params;

    // ✅ Check if request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, STATUS.BAD_REQUEST, "Request body is missing");
    }

    const { Type, Street, City, State, Country, Pincode } = req.body;

    // ✅ Check if all required fields are provided
    if (!Type || !Street || !City || !State || !Country || !Pincode) {
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.ALL_FIELDS_REQUIRED);
    }

    // ✅ Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }

    // ✅ Create new address
    const address = new Address({
      User_id: userId,
      Type,
      Street,
      City,
      State,
      Country,
      Pincode,
    });

    await address.save();

    return successResponse(res, STATUS.CREATED, address, MESSAGES.ADDRESS.ADDRESS_CREATED);
  } catch (error) {
    console.error("Error creating address:", error);
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// 📋 Get all addresses (admin/all users)
export const getAllAddress = async (req, res) => {
  try {
    const addresses = await Address.find();
    return successResponse(res, STATUS.SUCCESS, addresses, MESSAGES.ADDRESS.ADDRESS_FETCHED);
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// 👤 Get all addresses for a specific user
export const getUserAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ User_id: req.params.userId });

    if (!addresses || addresses.length === 0) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND);
    }

    return successResponse(res, STATUS.SUCCESS, addresses, MESSAGES.ADDRESS.USER_ADDRESS_FETCHED);
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};

// ✏️ Update an address by addressId
export const updateAddress = async (req, res) => {
  try {
    const updated = await Address.findByIdAndUpdate(
      req.params.addressId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND);
    }

    return successResponse(res, STATUS.SUCCESS, updated, MESSAGES.ADDRESS.ADDRESS_UPDATED);
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, error.message);
  }
};

// 🗑️ Delete an address by addressId
export const deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.findByIdAndDelete(req.params.addressId);

    if (!deleted) {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND);
    }

    return successResponse(res, STATUS.SUCCESS, null, MESSAGES.ADDRESS.ADDRESS_DELETED);
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR);
  }
};
