import { OrderSchemaClass } from '../../../../../orders/infrastructure/persistence/document/entities/order.schema';

import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type OrderItemSchemaDocument = HydratedDocument<OrderItemSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class OrderItemSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderSchemaClass',
    autopopulate: false,
  })
  order: OrderSchemaClass;

  @Prop({
    type: Number,
  })
  unitPrice: number;

  @Prop({
    type: Number,
  })
  quantity: number;

  @Prop({
    type: String,
  })
  productName: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const OrderItemSchema =
  SchemaFactory.createForClass(OrderItemSchemaClass);
