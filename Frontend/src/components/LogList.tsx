import LogItem from "./LogItem";

export default function LogList({ logs }: any) {
  return (
    <div>
      {logs.map((log: any) => (
        <LogItem key={log._id} log={log} />
      ))}
    </div>
  );
}
