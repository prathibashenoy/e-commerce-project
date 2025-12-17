//constants/response.js

// Success Response
export const successResponse = (res, statusCode, data = null, message = "Success") => {
  return res.status(statusCode).json({ success: true, message, data });
};

// Error Response
export const errorResponse = (res, statusCode, message = "Error") => {
  return res.status(statusCode).json({ success: false, message });
};