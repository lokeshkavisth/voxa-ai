import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatCard({
  title,
  value,
  description,
  icon,
  className,
}) {
  return (
    <Card className={cn("w-full max-h-max", className)}>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
