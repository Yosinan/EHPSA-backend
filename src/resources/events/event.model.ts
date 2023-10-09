import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  image: string;
  location: string;
  time: Date;
}

const eventSchema: Schema = new Schema<IEvent>({
  title: String,
  description: String,
  image: String,
  location: String,
  time: Date,
});

export default mongoose.model<IEvent>('Event', eventSchema);
