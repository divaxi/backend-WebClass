import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItemSchemaClass } from '../entities/order-item.schema';
import { OrderItemRepository } from '../../order-item.repository';
import { OrderItem } from '../../../../domain/order-item';
import { OrderItemMapper } from '../mappers/order-item.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrderItemDocumentRepository implements OrderItemRepository {
  constructor(
    @InjectModel(OrderItemSchemaClass.name)
    private readonly orderItemModel: Model<OrderItemSchemaClass>,
  ) {}

  async create(data: OrderItem): Promise<OrderItem> {
    const persistenceModel = OrderItemMapper.toPersistence(data);
    const createdEntity = new this.orderItemModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return OrderItemMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderItem[]> {
    const entityObjects = await this.orderItemModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      OrderItemMapper.toDomain(entityObject),
    );
  }

  async findById(id: OrderItem['id']): Promise<NullableType<OrderItem>> {
    const entityObject = await this.orderItemModel.findById(id);
    return entityObject ? OrderItemMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: OrderItem['id'][]): Promise<OrderItem[]> {
    const entityObjects = await this.orderItemModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      OrderItemMapper.toDomain(entityObject),
    );
  }

  async update(
    id: OrderItem['id'],
    payload: Partial<OrderItem>,
  ): Promise<NullableType<OrderItem>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.orderItemModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.orderItemModel.findOneAndUpdate(
      filter,
      OrderItemMapper.toPersistence({
        ...OrderItemMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? OrderItemMapper.toDomain(entityObject) : null;
  }

  async remove(id: OrderItem['id']): Promise<void> {
    await this.orderItemModel.deleteOne({ _id: id });
  }
}
