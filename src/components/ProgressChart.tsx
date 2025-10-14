import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface ProgressChartProps {
  stats?: {
    total: number;
    completed: number;
    percentage: number;
  };
}

const ProgressChart = ({ stats }: ProgressChartProps) => {
  const remaining = (stats?.total || 0) - (stats?.completed || 0);
  
  // Estimativa: 30 segundos por registro (ajuste conforme sua necessidade)
  const avgTimePerRecord = 30;
  const estimatedTimeSeconds = remaining * avgTimePerRecord;
  const estimatedHours = Math.floor(estimatedTimeSeconds / 3600);
  const estimatedMinutes = Math.floor((estimatedTimeSeconds % 3600) / 60);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progresso Geral</span>
          <span className="font-medium">{stats?.percentage || 0}%</span>
        </div>
        <Progress value={stats?.percentage || 0} className="h-3" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-primary/20 bg-card/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Tempo Estimado</span>
          </div>
          <p className="text-2xl font-bold">
            {estimatedHours > 0 && `${estimatedHours}h `}
            {estimatedMinutes}min
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {remaining} registros restantes
          </p>
        </div>

        <div className="rounded-lg border border-accent/20 bg-card/50 p-4">
          <div className="text-sm font-medium mb-2">Status</div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processados</span>
              <span className="text-accent font-medium">{stats?.completed || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pendentes</span>
              <span className="font-medium">{remaining}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
