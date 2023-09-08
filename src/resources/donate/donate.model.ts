// src/models/donate.model.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface Donate extends Document {
  currency: string;
  amount: number;
}

const donateSchema: Schema = new Schema({
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model<Donate>('Donate', donateSchema);
