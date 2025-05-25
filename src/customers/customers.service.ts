import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './infrastructure/persistence/customer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Customer } from './domain/customer';
import { SearchDto } from './dto/find-all-customers.dto';
import { EnumerateCountOrderDto } from '../satistic/dto/count-order.dto';
@Injectable()
export class CustomersService {
  constructor(
    // Dependencies here
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.customerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      note: createCustomerDto.note,

      address: createCustomerDto.address,

      email: createCustomerDto.email,

      phone: createCustomerDto.phone,

      name: createCustomerDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions<SearchDto>;
  }) {
    return this.customerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        search: paginationOptions.search,
      },
    });
  }

  findById(id: Customer['id']) {
    return this.customerRepository.findById(id);
  }

  findByIds(ids: Customer['id'][]) {
    return this.customerRepository.findByIds(ids);
  }

  countTotalByQuery(searchQuery: Omit<EnumerateCountOrderDto, 'enumerateBy'>) {
    return this.customerRepository.countTotalByQuery(searchQuery);
  }

  async update(
    id: Customer['id'],

    updateCustomerDto: UpdateCustomerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.customerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      note: updateCustomerDto.note,

      address: updateCustomerDto.address,

      email: updateCustomerDto.email,

      phone: updateCustomerDto.phone,

      name: updateCustomerDto.name,
    });
  }

  remove(id: Customer['id']) {
    return this.customerRepository.remove(id);
  }
}
