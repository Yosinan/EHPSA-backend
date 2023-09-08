// src/controllers/donate.controller.ts

import { Request, Response } from 'express';
import axios from 'axios';

export const createDonate = async (req: Request, res: Response) => {
  try {
    const { currency, amount } = req.body;
    console.log(currency, amount)

    const tx_ref = `tx_${Math.floor(Math.random() * 10000)}`;

    const authorization = process.env.API_AUTHORIZATION;
    const contentType = process.env.API_CONTENT_TYPE;

    const data = {
      amount,
      currency,
      tx_ref,
    };

    const headers = {
      'Authorization': authorization,
      'Content-Type': contentType,
    };

    const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', data, { headers });
    console.log(response.status)
    if (response.status === 200) {
      return res.status(200).json({
        statusCode: 200,
        data: response.data,
      });
    } else {
      return res.status(response.status).json({
        statusCode: response.status,
        message: 'Cannot create donation',
      });
    }
  } catch (error) {
    console.error('Error creating donation:', error);
    return res.status(400).json({ message: error});
  }
};
