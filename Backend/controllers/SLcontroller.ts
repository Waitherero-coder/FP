import { Request, Response } from 'express';
import SymptomLog, { ISymptomLog } from '../models/SymptomLog';

// POST /api/symptom-logs
export const addSymptomLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, date, mood, symptoms, energy_level, sleep_hours, notes } = req.body;

    if (!userId || !date || !mood || energy_level === undefined || sleep_hours === undefined) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const newLog: ISymptomLog = new SymptomLog({
      userId,
      date,
      mood,
      symptoms,
      energy_level,
      sleep_hours,
      notes,
    });

    await newLog.save();

    res.status(201).json({
      message: 'Symptom log added successfully',
      log: newLog,
    });
  } catch (error) {
    console.error('Error adding symptom log:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/symptom-logs/:userId
export const getSymptomLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const logs = await SymptomLog.find({ userId })
      .sort({ date: -1 })
      .limit(50);

    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching symptom logs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
