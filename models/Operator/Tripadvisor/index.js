//# DEPENDENCYS
import { Schema, model } from "mongoose";

const Tripadvisor = new Schema(
  {
    operator:{
         type: Schema.Types.ObjectId, ref: 'Operator' 
    },
    parentDisplayName: {
      type: String,
    },
    country: {
      type: String,
    },
    geoType: {
      type: String,
    },
    locationString: {
      type: String,
    },
    categoryKey: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    name: {
      type: String,
    },
    subcategoryKey: {
      type: Array,
    },
    locationId: {
      type: String,
    },
    longitude: {
      type: Number,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    region: {
      type: String,
    },
    ranking: {
      type: String,
    },
    municipality: {
      type: String,
    },
    island: {
      type: String,
    },
    timezone: {
      type: String,
    },
    rating: {
      type: Number,
    },
    numReviews: {
      type: Number,
    },
    phone: {
      type: String,
    },
    website: {
        type: String,
      },
    email: {
        type: String,
    },
    addressObj: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        country: String,
        postalcode: String
    },
    description:String
  },
  { timestamps: true, versionKey: false }
);

export default model("Tripadvisor", Tripadvisor);
