import { Schema, model, models } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const PaymentSchema = new Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['paid', 'pending', 'overdue'],
    default: 'pending',
  },
});

const RentalContractSchema = new Schema({
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  monthly_rent: { type: Number, required: true, min: 0 },
  payments: {
    type: [PaymentSchema],
    default: [],
  },
});

const PropertySchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['apartment', 'house', 'commercial', 'other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'rented', 'under_maintenance', 'for_sale', 'sold'],
      default: 'available',
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      street: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      zipcode: { type: String, trim: true },
      country: { type: String, required: true, trim: true },
      neighborhood: { type: String, trim: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    size: {
      type: Number,
      required: true,
      min: 1,
    },
    size_unit: {
      type: String,
      default: 'square_meters',
    },
    beds: {
      type: Number,
      required: true,
      min: 0,
    },
    baths: {
      type: Number,
      required: true,
      min: 0,
    },
    features: [
      {
        type: String,
        trim: true,
        maxlength: 50,
      },
    ],
    financials: {
      rent: {
        type: Number,
        required: true,
        min: 0,
      },
      deposit: {
        type: Number,
        min: 0,
      },
      fees: [
        {
          description: { type: String, trim: true },
          amount: { type: Number, min: 0 },
        },
      ],
      currency: {
        type: String,
        enum: ['USD', 'ARS', 'other'],
        default: 'ARS',
      },
    },
    rental_contract: {
      type: RentalContractSchema,
      default: null,
    },
    media: {
      images: {
        type: [String],
        validate: {
          validator: (v) => v.length <= 4,
          message: (props) =>
            `The images array can contain a maximum of 4 images, but got ${props.value.length}`,
        },
      },
      videos: [String],
      floor_plans: [String],
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model('Property', PropertySchema);

export default Property;
