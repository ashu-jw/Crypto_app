import axios from 'axios';
import StockData, { IStockData } from './models/StockData'; 
const dotenv = require('dotenv');
dotenv.config();

interface CryptoData {
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
}

export const fetchAndSaveData = async () => {
  const apiUrl = "https://api.livecoinwatch.com/coins/map";
  const apiKey = process.env.API_KEY; 
  try {
    const response = await axios.post(apiUrl, {
      codes: ['BNB', 'BTC', 'USDT', 'ETH', 'SOL'],
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 0,
      meta: false,
    }, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    const data: CryptoData[] = response.data;
    console.log(response.data);

    for (const crypto of data) {
      const { code, rate, volume, cap, delta } = crypto;

      const newStockData: IStockData = new StockData({
        code,
        rate,
        volume,
        cap,
        delta,
      });

      await newStockData.save();
    }

    console.log('Data fetched and saved successfully.');
    return data;
  } catch (error) {
    if (error instanceof Error) {
        console.error("Error fetching or saving data:", error.message);
      }
    return null;
  }
};
