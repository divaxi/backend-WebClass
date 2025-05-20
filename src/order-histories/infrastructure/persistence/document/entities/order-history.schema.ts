import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';

import { OrderSchemaClass } from '../../../../../orders/infrastructure/persistence/document/entities/order.schema';

import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type OrderHistorySchemaDocument =
  HydratedDocument<OrderHistorySchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class OrderHistorySchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchemaClass',
    autopopulate: true,
  })
  changeByUser: UserSchemaClass;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderSchemaClass',
    autopopulate: true,
  })
  order: OrderSchemaClass;

  @Prop({
    type: String,
  })
  status: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const OrderHistorySchema = SchemaFactory.createForClass(
  OrderHistorySchemaClass,
);
