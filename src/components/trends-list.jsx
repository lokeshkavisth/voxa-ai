import { CheckCircle } from "lucide-react";

export default function TrendsList({ trends }) {
  return (
    <ul className="space-y-2">
      {trends.map((trend) => (
        <li key={trend} className="flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
          <span>{trend}</span>
        </li>
      ))}
    </ul>
  );
}
