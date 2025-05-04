import { ReviewStatus } from '@prisma/client';
import prisma from '../../../helpers/prisma';
import ApiError from '../../errors/apiError';
import { IAuthUser } from '../../interface/common';
import httpStatus from 'http-status';

const addReview = async (user: IAuthUser, payload: any) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User is not authenticated or doesn't exist");
  }
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });

  await prisma.video.findFirstOrThrow({
    where: {
      id: payload.videoId,
    },
  });

  const result = await prisma.review.create({
    data: {
      ...payload,
      userId: userData.id,
    },
  });

  return result;
};

const editReview = async (user: IAuthUser, reviewId: string, payload: any) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authenticated');
  }
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });

  const review = await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
      status: ReviewStatus.PENDING,
    },
  });

  if (review.userId !== userData.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to edit this review');
  }

  const result = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      ...payload,
    },
  });

  return result;
};

const deleteReview = async (user: IAuthUser, reviewId: string) => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authenticated');
  }
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      isDeleted: false,
    },
  });

  const review = await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
      status: ReviewStatus.PENDING,
    },
  });

  if (review.userId !== userData.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to edit this review');
  }

  const result = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return result;
};


const getSingleReview = async (reviewId: string) => {

  const result = await prisma.review.findFirstOrThrow({
    where: {
      id: reviewId,
    },
    include: {
      user: true,
      video: true,
    }
  });

  return result;
};

const getReview = async () => {

  const result = await prisma.review.findMany()

  return result;
};

export const ReviewServices = {
  addReview,
  editReview,
  deleteReview,
  getSingleReview,
  getReview
};
