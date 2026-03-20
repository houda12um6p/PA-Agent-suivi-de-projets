interface ProgressChartProps {
  label: string;
  percentage: number;
}

// progress bar 
export default function ProgressChart({ label, percentage }: ProgressChartProps) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 text-sm">{label}</span>
        <span className="text-green-400 text-sm font-semibold">{clamped}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
