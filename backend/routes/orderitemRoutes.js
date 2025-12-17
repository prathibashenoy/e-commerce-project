import express from "express"
const router = express.Router()

router.get('/',getOrderItem)

export default router