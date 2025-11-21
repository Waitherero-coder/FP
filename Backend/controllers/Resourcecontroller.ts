import { Request, Response } from 'express';
import Resource from '../models/Resources';

// GET all resources or by category
export const getResources = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;

    const filter = category && category !== 'all'
      ? { category }
      : {};

    const resources = await Resource.find(filter).sort({ created_at: -1 });

    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
