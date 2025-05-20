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

    const query: Record<string, any> = {};

    if (search?.code) {
      query.orderCode = { $regex: search.code, $options: 'i' };
    }

    if (search?.status) {
      query.status = search.status;
    }

    if (search?.customer) {
      query['customer.name'] = { $regex: search.customer, $options: 'i' };
    }

    const entityObjects = await this.orderModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);

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
