import { any, object } from "zod";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
import { data } from "./payment.constans";
import {  paymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const payment=catchAsync(async (req, res) => {
  const user=req.user
  const{amount,userName,userPhone,contentId} = req.body
  const tran_id = Math.random().toString(16).substring(2)
  data.total_amount = amount
  data.cus_name =userName
  data.cus_email = user.email
  data.tran_id = tran_id
  data.cus_phone=userPhone
  const customData={
    ...data,
    contentId
  }
  const result=await paymentService.payment(customData,user)
  sendResponse(res,{
    message:"Payment Initiated",
    data:result,
    statuscode:StatusCodes.ACCEPTED,
    success:true
  })
})

 const successController =catchAsync(async (req, res) => {
  const { tran_id } = req.params;
  console.log(tran_id);
  const result = await paymentService.successPayment(tran_id);
    sendResponse(res, {
      message: "Payment Successful",
      data: result,
      statuscode: StatusCodes.OK,
      success: true,
    });
});
 const failedController =catchAsync(async (req, res) => {
  const { tran_id } = req.params;
  const result=await paymentService.failedPayment(tran_id);
    sendResponse(res, {
      message: "Payment Failed",
      data: result,
      statuscode: StatusCodes.OK,
      success: true,
    })
});

const getAllPayment =catchAsync(async (req, res) => {
  const result = await paymentService.getAllPayment();
    sendResponse(res, {
      message: "Payment Successful",
      data: result,
      statuscode: StatusCodes.OK,
      success: true,
    });
})

const getAllPaymentByUser =catchAsync(async (req, res) => {
  const user=req.user
  const result = await paymentService.getAllPaymentByUser(user.email);
    sendResponse(res, {
      message: "Payment Successful",
      data: result,
      statuscode: StatusCodes.OK,
      success: true,
    });
})

export const paymentController = {
  payment,
  successController,
  getAllPayment,
  getAllPaymentByUser,
  failedController
}