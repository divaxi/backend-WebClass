import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderHistorySchemaClass } from '../../../../order-histories/infrastructure/persistence/document/entities/order-history.schema';
import { OrderSchemaClass } from '../../../../orders/infrastructure/persistence/document/entities/order.schema';
import { UserSchemaClass } from '../../../../users/infrastructure/persistence/document/entities/user.schema';
import { OrderStatusEnum } from '../../../../orders/statuses.enum';
import { setHours, setMinutes, setSeconds } from 'date-fns';

@Injectable()
export class OrderHistorySeedService {
  constructor(
    @InjectModel(OrderHistorySchemaClass.name)
    private readonly model: Model<OrderHistorySchemaClass>,
    @InjectModel(OrderSchemaClass.name)
    private readonly orderModel: Model<OrderSchemaClass>,
    @InjectModel(UserSchemaClass.name)
    private readonly userModel: Model<UserSchemaClass>,
  ) {}

  private getRandomDate(start: Date, end: Date): Date {
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    return setSeconds(
      setMinutes(
        setHours(randomDate, Math.floor(Math.random() * 24)),
        Math.floor(Math.random() * 60),
      ),
      Math.floor(Math.random() * 60),
    );
  }

  private getRandomUser(users: UserSchemaClass[]): UserSchemaClass {
    return users[Math.floor(Math.random() * users.length)];
  }

  private getRandomOrder(orders: OrderSchemaClass[]): OrderSchemaClass {
    return orders[Math.floor(Math.random() * orders.length)];
  }

  private getRandomStatus(): OrderStatusEnum {
    const statuses = Object.values(OrderStatusEnum);
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  async run() {
    const count = await this.model.countDocuments();

    if (count === 0) {
      // Lấy danh sách users và orders từ database
      const users = await this.userModel.find().exec();
      const orders = await this.orderModel.find().exec();

      if (users.length === 0 || orders.length === 0) {
        console.log(
          'No users or orders found. Please run user and order seed first.',
        );
        return;
      }

      const startDate = new Date('2024-01-01');
      const endDate = new Date();

      // Tạo lịch sử cho mỗi đơn hàng
      for (const order of orders) {
        // Tạo 2-4 bản ghi lịch sử cho mỗi đơn hàng
        const numHistories = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < numHistories; i++) {
          const historyData = {
            changeByUser: this.getRandomUser(users),
            order: order,
            status: this.getRandomStatus(),
            createdAt: this.getRandomDate(startDate, endDate),
            updatedAt: this.getRandomDate(startDate, endDate),
          };

          const history = new this.model(historyData);
          await history.save();
        }
      }
    }
  }
}
