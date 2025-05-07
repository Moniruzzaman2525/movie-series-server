import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import prisma from "../../../helpers/prisma";
import ApiError from "../../errors/apiError";
import { TPaymentData } from "./payment.interface";
const SSLCommerzPayment = require('sslcommerz-lts')
const is_live = false
const payment = async (data: Partial<TPaymentData>, user: any) => {
  const { total_amount, cus_name, cus_email, tran_id, cus_phone, cus_add1, contentId } = data;
  const isExist = await prisma.payment.findFirst({
    where: {
      contentId: contentId,
      userId: user.id
    }
  })
  if (isExist) {
    throw new ApiError(StatusCodes.FORBIDDEN, "You have already purchased this content")
  }
  const sslcz = new SSLCommerzPayment(
    config.payment.store_id,
    config.payment.store_passwd,
    is_live
  );
  const apiResponse = await sslcz.init(data);
  const GatewayPageURL = apiResponse.GatewayPageURL;
  const transactionData = {
    total_amount: Number(total_amount),
    cus_name: cus_name || '',
    cus_email: cus_email || '',
    tran_id: tran_id || '',
    cus_phone: cus_phone || '',
    cus_add1: cus_add1 || '',
    userId: user.id,
    contentId: contentId || '',
    paymentStatus: false,
  };
  await prisma.payment.create({
    data: transactionData,
  });
  return {
    tran_id,
    total_amount,
    cus_name,
    GatewayPageURL,
  };
};

const successPayment = async (tran_id: any) => {
  const result = await prisma.payment.update({
    where: {
      tran_id: tran_id
    },
    data: {
      paymentStatus: true
    },
    include: {
      user: true,
      video: true
    }
  })
  return result
};

const failedPayment = async (trx_id: any) => {
  const result = await prisma.payment.delete({
    where: {
      tran_id: trx_id
    }
  }
  )
  return result
}

const getAllPayment = async () => {
  try {
    const result = await prisma.payment.findMany({
      include: {
        user: true,
        video: true
      }
    });
    return result;
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Something went wrong")
  }
}

const getAllPaymentByUser = async (id: string) => {
  try {
    const result = await prisma.payment.findMany({
      where: {
        userId: id
      },
      include: {
        video: true
      }
    });
    return result;
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Something went wrong")
  }
}
export const paymentService = {
  payment,
  successPayment,
  getAllPayment,
  getAllPaymentByUser,
  failedPayment
}
