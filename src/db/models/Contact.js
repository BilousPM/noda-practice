import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectID,
    },
  },
  {
    versionKey: false,
  },
);

export const ContactCollection = model('contact', contactSchema);
