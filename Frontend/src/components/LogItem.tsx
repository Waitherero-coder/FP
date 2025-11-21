export default function LogItem({ log }: any) {
  return (
    <div>
      <h3>{log.symptoms.join(", ")}</h3>
      <p>Severity: {log.severity}</p>
      <p>{log.notes}</p>
      <p>Date: {new Date(log.date).toDateString()}</p>
    </div>
  );
}
