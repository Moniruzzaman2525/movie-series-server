import { any, object } from "zod";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
// import { data } from "./payment.constans";
import {  paymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { v4 as uuid } from 'uuid';
const payment=catchAsync(async (req, res) => {
  const user=req.user
  const {tID}=req.params
  const{amount,contentId} = req.body
  const tran_id = uuid()
  console.log(tID);
const data = {
        total_amount: amount,
        currency: 'BDT',
        tran_id: tran_id,
        success_url: `${config.server_url}/api/v1/payment/success/${tran_id}`,
        fail_url:  `${config.server_url}/api/v1/payment/failed/${tID}`,
        cancel_url: `${config.base_url}/cancel`,
        ipn_url: '',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
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
  const { tId } = req.params;
  const result = await paymentService.successPayment(tId);
    res.redirect(`${config.base_url}/success`)
    sendResponse(res, {
      message: "Payment Successful",
      data: null,
      statuscode: StatusCodes.OK,
      success: true,
    });
});
 const failedController =catchAsync(async (req, res) => {
  const { tran_id } = req.params;
  const result=await paymentService.failedPayment(tran_id);
  res.redirect(`${config.base_url}/fail`)
    sendResponse(res, {
      message: "Payment Failed",
      data: null,
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