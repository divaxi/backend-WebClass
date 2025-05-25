import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderSchemaClass } from '../../../../orders/infrastructure/persistence/document/entities/order.schema';
import { OrderStatusEnum } from '../../../../orders/statuses.enum';
import { addDays, setHours, setMinutes, setSeconds } from 'date-fns';
import { CustomerSchemaClass } from '../../../../customers/infrastructure/persistence/document/entities/customer.schema';
import { OrderItem } from '../../../../order-item/domain/order-item';

@Injectable()
export class OrderSeedService {
  constructor(
    @InjectModel(OrderSchemaClass.name)
    private readonly model: Model<OrderSchemaClass>,
    @InjectModel(CustomerSchemaClass.name)
    private readonly customerModel: Model<CustomerSchemaClass>,
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

  private getRandomCustomer(
    customers: CustomerSchemaClass[],
  ): CustomerSchemaClass {
    return customers[Math.floor(Math.random() * customers.length)];
  }

  private getRandomItems(): { items: OrderItem[]; totalAmount: number } {
    const products = [
      { name: 'iPhone 15 Pro Max', price: 35000000 },
      { name: 'Samsung Galaxy S24 Ultra', price: 32000000 },
      { name: 'MacBook Pro M3', price: 45000000 },
      { name: 'iPad Pro 12.9', price: 28000000 },
      { name: 'AirPods Pro 2', price: 6500000 },
      { name: 'Apple Watch Series 9', price: 12000000 },
      { name: 'Sony WH-1000XM5', price: 8500000 },
      { name: 'Samsung 65" QLED TV', price: 25000000 },
    ];

    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
    const items: OrderItem[] = [];
    let totalAmount = 0;

    for (let i = 0; i < numItems; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 quantity
      items.push({
        productName: product.name,
        quantity: quantity,
        unitPrice: product.price,
      });
      totalAmount += product.price * quantity;
    }

    return { items, totalAmount };
  }

  async run() {
    const count = await this.model.countDocuments();

    if (count === 0) {
      // Lấy danh sách customer từ database
      const customers = await this.customerModel.find().exec();

      if (customers.length === 0) {
        console.log('No customers found. Please run customer seed first.');
        return;
      }

      const startDate = new Date('2025-05-20');
      const endDate = new Date('2025-05-26');

      const sampleOrders = [
        {
          customer: this.getRandomCustomer(customers),
          ...this.getRandomItems(),
          status: OrderStatusEnum.NEW_PENDING,
          orderDate: this.getRandomDate(startDate, endDate),
          expectedDeliveryDate: addDays(new Date(), 4),
          deliveryAddress: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
          orderCode: 'ORD001',
          createdAt: this.getRandomDate(startDate, endDate),
        },
        {
          customer: this.getRandomCustomer(customers),
          ...this.getRandomItems(),
          status: OrderStatusEnum.CONFIRMED,
          orderDate: this.getRandomDate(startDate, endDate),
          expectedDeliveryDate: addDays(new Date(), 4),
          deliveryAddress: '456 Đường Lê Lợi, Quận 1, TP.HCM',
          orderCode: 'ORD002',
          createdAt: this.getRandomDate(startDate, endDate),
        },
        {
          customer: this.getRandomCustomer(customers),
          ...this.getRandomItems(),
          status: OrderStatusEnum.DELIVERED,
          orderDate: this.getRandomDate(startDate, endDate),
          deliveredDate: this.getRandomDate(startDate, endDate),
          expectedDeliveryDate: addDays(new Date(), 2),
          deliveryAddress: '789 Đường Đồng Khởi, Quận 1, TP.HCM',
          orderCode: 'ORD003',
          createdAt: this.getRandomDate(startDate, endDate),
        },
        {
          customer: this.getRandomCustomer(customers),
          ...this.getRandomItems(),
          status: OrderStatusEnum.PACKING,
          orderDate: this.getRandomDate(startDate, endDate),
          expectedDeliveryDate: addDays(new Date(), 3),
          deliveryAddress: '321 Đường Đồng Khởi, Quận 1, TP.HCM',
          orderCode: 'ORD004',
          createdAt: this.getRandomDate(startDate, endDate),
        },
        {
          customer: this.getRandomCustomer(customers),
          ...this.getRandomItems(),
          status: OrderStatusEnum.SHIPPED,
          orderDate: this.getRandomDate(startDate, endDate),
          expectedDeliveryDate: addDays(new Date(), 1),
          deliveryAddress: '654 Đường Lê Duẩn, Quận 1, TP.HCM',
          orderCode: 'ORD005',
          createdAt: this.getRandomDate(startDate, endDate),
        },
        {
          customer: this.getRandomCustomer(customers),
          ...this.getRandomItems(),
          status: OrderStatusEnum.IN_TRANSIT,
          orderDate: this.getRandomDate(startDate, endDate),
          expectedDeliveryDate: addDays(new Date(), 2),
          deliveryAddress: '987 Đường Võ Văn Tần, Quận 3, TP.HCM',
          orderCode: 'ORD006',
          createdAt: this.getRandomDate(startDate, endDate),
        },
        {
          customer: this.getRandomCustomer(customers),
          ...this.getRandomItems(),
          status: OrderStatusEnum.CANCELLED,
          orderDate: this.getRandomDate(startDate, endDate),
          expectedDeliveryDate: addDays(new Date(), 2),
          deliveryAddress: '147 Đường Nguyễn Đình Chiểu, Quận 3, TP.HCM',
          orderCode: 'ORD007',
          createdAt: this.getRandomDate(startDate, endDate),
        },
        {
          customer: this.getRandomCustomer(customers),
          ...this.getRandomItems(),
          status: OrderStatusEnum.RETURNED,
          orderDate: this.getRandomDate(startDate, endDate),
          deliveredDate: this.getRandomDate(startDate, endDate),
          expectedDeliveryDate: addDays(new Date(), 3),
          deliveryAddress: '258 Đường Võ Thị Sáu, Quận 3, TP.HCM',
          orderCode: 'ORD008',
          createdAt: this.getRandomDate(startDate, endDate),
        },
      ];

      for (const orderData of sampleOrders) {
        const order = new this.model(orderData);
        await order.save();
      }
    }
  }
}
