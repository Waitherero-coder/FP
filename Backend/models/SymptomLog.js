import mongoose from "mongoose";

const symptomLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symptoms: [{ type: String, required: true }],
  severity: { type: Number, required: true },
  notes: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("SymptomLog", symptomLogSchema);
