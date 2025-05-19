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
