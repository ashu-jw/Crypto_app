import { Router, Request, Response } from 'express';
import StockData, { IStockData } from '../models/StockData';

const router = Router();

const getStockData = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const data = await StockData.find({ code: symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred.');
    }
  }
};

router.get('/:symbol', getStockData);

export default router;