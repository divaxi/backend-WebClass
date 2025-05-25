import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { SessionModule } from './session/session.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose-config.service';

const infrastructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});

import { CustomersModule } from './customers/customers.module';

import { OrdersModule } from './orders/orders.module';

import { OrderHistoriesModule } from './order-histories/order-histories.module';
import { SatisticModule } from './satistic/satistic.module';
@Module({
  imports: [
    OrderHistoriesModule,
    OrdersModule,
    CustomersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    UsersModule,
    AuthModule,
    SessionModule,
    HomeModule,
    SatisticModule,
  ],
})
export class AppModule {}
