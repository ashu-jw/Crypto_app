import mongoose, { Document } from 'mongoose';

export interface IStockData extends Document {
  code: string;
  rate: number;
  volume: number;
  cap: number;
  delta: {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
  };
  timestamp: Date;
}

const StockDataSchema = new mongoose.Schema({
  code: { type: String, required: true },
  rate: { type: Number, required: true },
  volume: { type: Number, required: true },
  cap: { type: Number, required: true },
  delta: {
    hour: { type: Number, required: true },
    day: { type: Number, required: true },
    week: { type: Number, required: true },
    month: { type: Number, required: true },
    quarter: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});

const StockData = mongoose.model<IStockData>('StockData', StockDataSchema);

export default StockData;
