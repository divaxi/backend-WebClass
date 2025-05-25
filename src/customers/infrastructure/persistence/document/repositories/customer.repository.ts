import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerSchemaClass } from '../entities/customer.schema';
import { CustomerRepository } from '../../customer.repository';
import { Customer } from '../../../../domain/customer';
import { CustomerMapper } from '../mappers/customer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { SearchDto } from '../../../../dto/find-all-customers.dto';
import { TotalResponseDto } from '../../../../../satistic/dto/satistic.dto';
import { EnumerateCountOrderDto } from '../../../../../satistic/dto/count-order.dto';

@Injectable()
export class CustomerDocumentRepository implements CustomerRepository {
  constructor(
    @InjectModel(CustomerSchemaClass.name)
    private readonly customerModel: Model<CustomerSchemaClass>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const persistenceModel = CustomerMapper.toPersistence(data);
    const createdEntity = new this.customerModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return CustomerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions<SearchDto>;
  }): Promise<Customer[]> {
    const { page, limit, search } = paginationOptions;

    const query: Record<string, any> = {};

    if (search?.phone) {
      query.phone = { $regex: search.phone, $options: 'i' };
    }

    if (search?.name) {
      query.name = { $regex: search.name, $options: 'i' };
    }

    if (search?.address) {
      query.address = { $regex: search.address, $options: 'i' };
    }

    const entityObjects = await this.customerModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    return entityObjects.map((entityObject) =>
      CustomerMapper.toDomain(entityObject),
    );
  }

  async findById(id: Customer['id']): Promise<NullableType<Customer>> {
    const entityObject = await this.customerModel.findById(id);
    return entityObject ? CustomerMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Customer['id'][]): Promise<Customer[]> {
    const entityObjects = await this.customerModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      CustomerMapper.toDomain(entityObject),
    );
  }

  async countTotalByQuery(
    searchQuery: Omit<EnumerateCountOrderDto, 'enumerateBy'>,
  ): Promise<TotalResponseDto> {
    const { startDate, endDate } = searchQuery;
    const query: Record<string, any> = {};

    if (startDate) {
      query.createdAt = { $gte: startDate };
    }

    if (endDate) {
      query.createdAt = { $lte: endDate };
    }

    const total = await this.customerModel.countDocuments(query);
    return { total };
  }

  async update(
    id: Customer['id'],
    payload: Partial<Customer>,
  ): Promise<NullableType<Customer>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.customerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.customerModel.findOneAndUpdate(
      filter,
      CustomerMapper.toPersistence({
        ...CustomerMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? CustomerMapper.toDomain(entityObject) : null;
  }

  async remove(id: Customer['id']): Promise<void> {
    await this.customerModel.deleteOne({ _id: id });
  }
}
