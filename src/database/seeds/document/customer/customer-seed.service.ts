import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerSchemaClass } from '../../../../customers/infrastructure/persistence/document/entities/customer.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class CustomerSeedService {
  constructor(
    @InjectModel(CustomerSchemaClass.name)
    private readonly model: Model<CustomerSchemaClass>,
  ) {}

  async run(countToGenerate = 10) {
    const count = await this.model.countDocuments();

    // Chỉ seed nếu chưa có dữ liệu
    if (count === 0) {
      const customers = Array.from({ length: countToGenerate }).map(() => ({
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        address: `${faker.location.city()}, ${faker.location.street()}`,
        note: faker.lorem.words({ min: 5, max: 10 }),
      }));

      await this.model.insertMany(customers);
      console.log(`Seeded ${customers.length} customers.`);
    } else {
      console.log(
        `Customer collection already has ${count} documents. Skipping seeding.`,
      );
    }
  }
}
