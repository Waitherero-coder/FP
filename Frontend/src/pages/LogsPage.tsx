import { useEffect, useState } from "react";
import { getLogs } from "../api/logApi";
import LogForm from "../components/LogForm";
import LogList from "../components/LogList";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await getLogs("lyza123");
      setLogs(res.data);
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Your Symptom Logs</h2>
      <LogForm />
      <LogList logs={logs} />
    </div>
  );
}
