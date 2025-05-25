import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderSchemaClass } from '../entities/order.schema';
import { OrderRepository } from '../../order.repository';
import { Order } from '../../../../domain/order';
import { OrderMapper } from '../mappers/order.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { SearchDto } from '../../../../dto/find-all-orders.dto';
import {
  DayByDay,
  MonthByMonth,
  TotalResponseDto,
  YearByYear,
} from '../../../../../satistic/dto/satistic.dto';
import { EnumerateResponseDto } from '../../../../../satistic/dto/satistic.dto';

@Injectable()
export class OrderDocumentRepository implements OrderRepository {
  constructor(
    @InjectModel(OrderSchemaClass.name)
    private readonly orderModel: Model<OrderSchemaClass>,
  ) {}

  async create(data: Order): Promise<Order> {
    const persistenceModel = OrderMapper.toPersistence(data);
    const createdEntity = new this.orderModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return OrderMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions<SearchDto>;
  }): Promise<Order[]> {
    const { page, limit, search } = paginationOptions;

    const matchStage: Record<string, any> = {};

    if (search?.code) {
      matchStage.orderCode = { $regex: search.code, $options: 'i' };
    }

    if (search?.status) {
      matchStage.status = search.status;
    }

    if (search?.customer) {
      matchStage['customer.name'] = { $regex: search.customer, $options: 'i' };
    }

    const pipeline = [
      {
        $lookup: {
          from: 'customerschemaclasses', // tên collection trong MongoDB
          localField: 'customer',
          foreignField: '_id',
          as: 'customer',
        },
      },
      {
        $unwind: '$customer',
      },
      {
        $match: matchStage,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ];

    const entityObjects = await this.orderModel.aggregate(pipeline);

    return entityObjects.map((entityObject) =>
      OrderMapper.toDomain(entityObject),
    );
  }
  async findById(id: Order['id']): Promise<NullableType<Order>> {
    const entityObject = await this.orderModel.findById(id);
    return entityObject ? OrderMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Order['id'][]): Promise<Order[]> {
    const entityObjects = await this.orderModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      OrderMapper.toDomain(entityObject),
    );
  }

  async countDayByDay(
    searchQuery: Omit<SearchDto, 'code'>,
  ): Promise<EnumerateResponseDto<DayByDay>> {
    const { startDate, endDate, status } = searchQuery;
    const query: Record<string, any> = {};

    query.createdAt = {};
    if (startDate)
      query.createdAt.$gte =
        startDate instanceof Date ? startDate : new Date(startDate);
    if (endDate)
      query.createdAt.$lte =
        endDate instanceof Date ? endDate : new Date(endDate);
    if (status) query.status = status;

    const entityObjects = await this.orderModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: { $dayOfYear: '$createdAt' },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $project: { _id: 0, day: '$_id', count: 1, revenue: 1 } },
    ]);

    return {
      total: entityObjects.length,
      data: entityObjects.map((entityObject) => ({
        day: entityObject.day,
        count: entityObject.count,
        revenue: entityObject.revenue,
      })),
    };
  }

  async countMonthByMonth(
    searchQuery: Omit<SearchDto, 'code'>,
  ): Promise<EnumerateResponseDto<MonthByMonth>> {
    const { startDate, endDate, status } = searchQuery;
    const query: Record<string, any> = {};

    query.createdAt = {};
    if (startDate)
      query.createdAt.$gte =
        startDate instanceof Date ? startDate : new Date(startDate);
    if (endDate)
      query.createdAt.$lte =
        endDate instanceof Date ? endDate : new Date(endDate);
    if (status) query.status = status;

    const entityObjects = await this.orderModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $project: { _id: 0, month: '$_id', count: 1, revenue: 1 } },
    ]);

    return {
      total: entityObjects.length,
      data: entityObjects.map((entityObject) => ({
        month: entityObject.month,
        count: entityObject.count,
        revenue: entityObject.revenue,
      })),
    };
  }

  async countYearByYear(
    searchQuery: Omit<SearchDto, 'code'>,
  ): Promise<EnumerateResponseDto<YearByYear>> {
    const { startDate, endDate, status } = searchQuery;
    const query: Record<string, any> = {};

    query.createdAt = {};
    if (startDate)
      query.createdAt.$gte =
        startDate instanceof Date ? startDate : new Date(startDate);
    if (endDate)
      query.createdAt.$lte =
        endDate instanceof Date ? endDate : new Date(endDate);
    if (status) query.status = status;

    const entityObjects = await this.orderModel.aggregate([
      { $match: query },
      {
        $group: {
          _id: { $year: '$createdAt' },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $project: { _id: 0, year: '$_id', count: 1, revenue: 1 } },
    ]);

    return {
      total: entityObjects.length,
      data: entityObjects.map((entityObject) => ({
        year: entityObject.year,
        count: entityObject.count,
        revenue: entityObject.revenue,
      })),
    };
  }

  async countTotalByQuery(
    searchQuery: Omit<SearchDto, 'code'>,
  ): Promise<TotalResponseDto> {
    const { startDate, endDate, status } = searchQuery;
    const query: Record<string, any> = {};

    query.createdAt = {};
    if (startDate)
      query.createdAt.$gte =
        startDate instanceof Date ? startDate : new Date(startDate);
    if (endDate)
      query.createdAt.$lte =
        endDate instanceof Date ? endDate : new Date(endDate);
    if (status) query.status = status;

    const entityObjects = await this.orderModel.countDocuments(query);

    return {
      total: entityObjects,
      status: status,
    };
  }

  async revenueTotalByQuery(
    searchQuery: Omit<SearchDto, 'code'>,
  ): Promise<TotalResponseDto> {
    const { startDate, endDate, status } = searchQuery;
    const query: Record<string, any> = {};

    query.createdAt = {};
    if (startDate)
      query.createdAt.$gte =
        startDate instanceof Date ? startDate : new Date(startDate);
    if (endDate)
      query.createdAt.$lte =
        endDate instanceof Date ? endDate : new Date(endDate);
    if (status) query.status = status;
    const entityObjects = await this.orderModel.find(query);

    return {
      total: entityObjects.reduce(
        (acc, entityObject) => acc + entityObject.totalAmount,
        0,
      ),
    };
  }

  async update(
    id: Order['id'],
    payload: Partial<Order>,
  ): Promise<NullableType<Order>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.orderModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.orderModel.findOneAndUpdate(
      filter,
      OrderMapper.toPersistence({
        ...OrderMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? OrderMapper.toDomain(entityObject) : null;
  }

  async remove(id: Order['id']): Promise<void> {
    await this.orderModel.deleteOne({ _id: id });
  }
}
