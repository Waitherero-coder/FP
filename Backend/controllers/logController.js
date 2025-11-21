import SymptomLog from "../models/SymptomLog.js";

export const createLog = async (req, res) => {
  try {
    const log = await SymptomLog.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await SymptomLog.find({ userId: req.params.userId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLog = async (req, res) => {
  try {
    const updated = await SymptomLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLog = async (req, res) => {
  try {
    await SymptomLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Log deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
