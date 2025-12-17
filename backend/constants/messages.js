//constants/messages.js

export const MESSAGES={
    INVALID_CREDENTIALS:"Invalid email or password",
    SERVER_ERROR:"Something went wrong on the server",
    INTERNAL_SERVER_ERROR:"Internal Server Error",
    ReferenceError: "errorResponse is not defined",

    //auth /User
    EMAIL_EXISTS:"Email already registered",
    USER_REGISTERED:"User registered successfully",
    PROFILE_CREATED:"User profile created successfully",
    LOGIN_SUCCESS:"Login successfull",
    USERS_FETCHED:"Users fetched successfully",
    USER_FETCHED:"User fetched successfully",
    USER_UPDATED:"User updated successfully",
    USER_DELETED:"User deleted successfully",
    USER_NOT_FOUND:"User not found",
    ALL_FIELDS_REQUIRED:"All fields are required",
    PRODUCT_LIST:"Product listed successfully",
    PRODUCT_NOT_FOUND:"The Product Cannot find",
    PRODUCT_FOUND:"The Product finded successfully",
    PRODUCT_EXISTS:"Product already exists",
    PRODUCT_CREATED:"Product created successfully",
    CATEGORY:{
        CATEGORY_CREATED:"Category created successfully",
        CATEGORY_EXIST:"Category Exist",
        CATEGORY_NOT_FOUND:"Category not found",
        CATEGORY_FETCHED:"Category fetched successfully",
        CATEGORY_UPDATED:"Category updated successfully",
        CATEGORY_DELETED:"Category deleted successfully"
    },
    ORDER:{
        FETCHED:"get all orders for a user successfully",
        NOT_FOUND:"Order not found",
        FETCH_SUCCESS:"Orders fetched successfully",
        CREATE_SUCCESS:"Order created successfully",
        DELETE_SUCCESS:"Order deleted successfully",
    },
    PRODUCT:{
          

    },
    CART:{
       ITEM_ADDED:"Item added to cart" ,
       ITEM_NOT_FOUND:"Item not found",
       ITEM_REMOVED:"Item deleted successfully",
       NOT_FOUND:"cart not found",
    },
    ADDRESS:{
        ADDRESS_CREATED:"Address created",
        ALREADY_EXIST:"Address is already existed",
        ADDRESS_FETCHED:"All users Address fetched successfully",
        USER_ADDRESS_FETCHED:"The one userAddress fetched successfully",
        NOT_FOUND:"Address not found",
        ADDRESS_UPDATED:"Address updated Successfully",
        ADDRESS_DELETED:"Address deleted Successfully",
        
    }
}