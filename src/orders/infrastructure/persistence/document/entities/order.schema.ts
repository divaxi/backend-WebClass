import { OrderItemSchemaClass } from '../../../../../order-items/infrastructure/persistence/document/entities/order-item.schema';

import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

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
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItemSchemaClass',
        autopopulate: true,
      },
    ],
  })
  item: OrderItemSchemaClass[];

  @Prop({
    type: Number,
  })
  totalAmount: number;

  @Prop({
    type: String,
  })
  status?: string;

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
