import httpStatus from 'http-status';
import { uploadToCloudinary } from '../../../utils';
import { Prisma, PrismaClient } from '@prisma/client';

import { calculatePagination, searchableFields } from './content.constans';
import { SearchParams, TPaginationOptions } from './content.interface';
import ApiError from '../../errors/apiError';

const prisma = new PrismaClient();

const createContent = async (req: any) => {
  try {
    const file = req.file;
    if (file) {
      const uploadImage = await uploadToCloudinary(file);
      req.body.thumbnailImage = uploadImage.secure_url;
    }
    const content = await prisma.video.create({
      data: req.body,
    });
    return content;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message);
  }
};

const getAllContent = async (params: SearchParams, options: TPaginationOptions) => {
  try {
    const { searchTerm, ...exactMatchFields } = params;
    const { page, limit, sortBy, sortOrder, skip } = calculatePagination(options);
    const conditions: Prisma.VideoWhereInput[] = [];

    //*create search conditions for searchable fields
    if (searchTerm) {
      conditions.push({
        OR: searchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }

    //*create conditions for exact match fields
    if (Object.keys(exactMatchFields).length > 0) {
      conditions.push({
        AND: Object.entries(exactMatchFields).map(([key, value]) => {
          if (Array.isArray(value)) {
            return { [key]: { in: value } };
          }
          return { [key]: { equals: value } };
        }),
      });
    }

    const whereConditions: Prisma.VideoWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};
    const result = await prisma.video.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
    });
    return {
      meta: {
        page,
        limit,
        total: await prisma.video.count({
          where: whereConditions,
        }),
      },
      data: result,
    };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Database operation failed');
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//* update content

const updateContent = async (id: string, req: any) => {
  const file = req.file;

  if (file) {
    const uploadImage = await uploadToCloudinary(file);
    req.body.thumbnailImage = uploadImage.secure_url;
  }
  try {
    const isExist = await prisma.video.findUnique({
      where: { id },
    });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
    }
    const content = await prisma.video.update({
      where: { id },
      data: req.body,
    });
    return content;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message);
  }
};

const getContentById = async (id: string) => {
  try {
    const isExist = await prisma.video.findUnique({
      where: { id },
    });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
    }
    const content = await prisma.video.findUnique({
      where: { id },
    });
    return content;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message);
  }
};

const deleteContent = async (id: string) => {
  try {
    const isExist = await prisma.video.findUnique({
      where: { id },
    });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Content not found');
    }
    const content = await prisma.video.delete({
      where: { id },
    });
    return content;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, (err as Error).message);
  }
};

export const contentService = {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
  getContentById,
};
