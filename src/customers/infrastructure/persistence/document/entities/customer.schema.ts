import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type CustomerSchemaDocument = HydratedDocument<CustomerSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class CustomerSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
  })
  note?: string | null;

  @Prop({
    type: String,
  })
  address: string;

  @Prop({
    type: String,
  })
  email?: string | null;

  @Prop({
    type: String,
  })
  phone: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerSchemaClass);
