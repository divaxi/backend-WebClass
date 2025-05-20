import { CustomerSchemaClass } from '../../../../../customers/infrastructure/persistence/document/entities/customer.schema';

import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { OrderItem } from '../../../../../order-item/domain/order-item';
import { OrderStatusEnum } from '../../../../statuses.enum';

export type OrderSchemaDocument = HydratedDocument<OrderSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class OrderSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerSchemaClass',
    autopopulate: true,
  })
  customer: CustomerSchemaClass;

  @Prop({
    type: [OrderItem],
  })
  item: OrderItem[];

  @Prop({
    type: Number,
  })
  totalAmount: number;

  @Prop({
    type: String,
    enum: Object.values(OrderStatusEnum),
  })
  status: OrderStatusEnum;

  @Prop({
    type: Date,
  })
  deliveredDate?: Date | null;

  @Prop({
    type: Date,
  })
  expectedDeliveryDate?: Date | null;

  @Prop({
    type: Date,
  })
  orderDate?: Date;

  @Prop({
    type: String,
  })
  deliveryAddress: string;

  @Prop({
    type: String,
  })
  orderCode: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderSchemaClass);
