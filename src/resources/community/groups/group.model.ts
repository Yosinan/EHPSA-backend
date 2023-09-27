import mongoose, { Document, Schema } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  messages: IMessage[];
}

export interface IMessage {
  userId: mongoose.Types.ObjectId;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  fileUrl?: string;
  _id: mongoose.Types.ObjectId;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: String,
  imageUrl: String,
  videoUrl: String,
  fileUrl: String,
  _id: mongoose.Types.ObjectId,
  timestamp: { type: Date, required: true },
});

const groupSchema = new Schema<IGroup>({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    required: true,
  },
  messages: {
    type: [messageSchema],
    default: [],
  },
});

export const GroupModel = mongoose.model<IGroup>('Group', groupSchema);
