import { NestFactory } from '@nestjs/core';
import { OrderHistorySeedService } from './order-history/order-history-seed.service';
import { OrderSeedService } from './order/order-seed.service';
import { CustomerSeedService } from './customer/customer-seed.service';
import { UserSeedService } from './user/user-seed.service';

import { SeedModule } from './seed.module';

const runSeed = async () => {
  try {
    console.log('🚀 Bắt đầu chạy seed data...');

    const app = await NestFactory.create(SeedModule);

    // 1. Seed Users
    console.log('📝 Đang seed dữ liệu Users...');
    await app.get(UserSeedService).run();
    console.log('✅ Đã hoàn thành seed Users');

    // 2. Seed Customers
    console.log('📝 Đang seed dữ liệu Customers...');
    await app.get(CustomerSeedService).run();
    console.log('✅ Đã hoàn thành seed Customers');

    // 3. Seed Orders
    console.log('📝 Đang seed dữ liệu Orders...');
    await app.get(OrderSeedService).run();
    console.log('✅ Đã hoàn thành seed Orders');

    // 4. Seed Order Histories
    console.log('📝 Đang seed dữ liệu Order Histories...');
    await app.get(OrderHistorySeedService).run();
    console.log('✅ Đã hoàn thành seed Order Histories');

    console.log('🎉 Hoàn thành seed tất cả dữ liệu!');

    await app.close();
  } catch (error) {
    console.error('❌ Lỗi khi chạy seed:', error);
    process.exit(1);
  }
};

void runSeed();
