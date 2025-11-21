import { useState } from "react";
import { createLog } from "../api/logApi";

export default function LogForm() {
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState(1);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newLog = {
      userId: "lyza123",
      symptoms: symptoms.split(","),
      severity,
      notes
    };

    await createLog(newLog);
    alert("Log saved!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        placeholder="Symptoms (comma separated)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <input 
        type="number"
        min="1"
        max="5"
        value={severity}
        onChange={(e) => setSeverity(Number(e.target.value))}
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button type="submit">Save Log</button>
    </form>
  );
}
