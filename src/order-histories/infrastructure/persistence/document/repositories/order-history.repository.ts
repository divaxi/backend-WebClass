import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderHistorySchemaClass } from '../entities/order-history.schema';
import { OrderHistoryRepository } from '../../order-history.repository';
import { OrderHistory } from '../../../../domain/order-history';
import { OrderHistoryMapper } from '../mappers/order-history.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { SearchDto } from '../../../../dto/find-all-order-histories.dto';
@Injectable()
export class OrderHistoryDocumentRepository implements OrderHistoryRepository {
  constructor(
    @InjectModel(OrderHistorySchemaClass.name)
    private readonly orderHistoryModel: Model<OrderHistorySchemaClass>,
  ) {}

  async create(data: OrderHistory): Promise<OrderHistory> {
    const persistenceModel = OrderHistoryMapper.toPersistence(data);
    const createdEntity = new this.orderHistoryModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return OrderHistoryMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions<SearchDto>;
  }): Promise<OrderHistory[]> {
    const { page, limit, search } = paginationOptions;
    const query: Record<string, any> = {};

    if (search?.orderId) {
      query.order = search.orderId;
    }
    const entityObjects = await this.orderHistoryModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return entityObjects.map((entityObject) =>
      OrderHistoryMapper.toDomain(entityObject),
    );
  }

  async findById(id: OrderHistory['id']): Promise<NullableType<OrderHistory>> {
    const entityObject = await this.orderHistoryModel.findById(id);
    return entityObject ? OrderHistoryMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: OrderHistory['id'][]): Promise<OrderHistory[]> {
    const entityObjects = await this.orderHistoryModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      OrderHistoryMapper.toDomain(entityObject),
    );
  }

  async update(
    id: OrderHistory['id'],
    payload: Partial<OrderHistory>,
  ): Promise<NullableType<OrderHistory>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.orderHistoryModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.orderHistoryModel.findOneAndUpdate(
      filter,
      OrderHistoryMapper.toPersistence({
        ...OrderHistoryMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? OrderHistoryMapper.toDomain(entityObject) : null;
  }

  async remove(id: OrderHistory['id']): Promise<void> {
    await this.orderHistoryModel.deleteOne({ _id: id });
  }
}
