import mongoose, { Document, Schema } from 'mongoose';

interface IAlert extends Document {
    email: string;
    crypto: string;
    condition: 'greater' | 'less';
    threshold: number;
    triggered:boolean;
}

const AlertSchema = new Schema<IAlert>({
    email: { type: String, required: true },
    crypto: { type: String, required: true },
    condition: { type: String, enum: ['greater', 'less'], required: true },
    threshold: { type: Number, required: true },
    triggered: { type: Boolean, default: false }, 
});

export default mongoose.model<IAlert>('Alert', AlertSchema);
