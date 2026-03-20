import Badge from '../ui/Badge';

interface AlertCardProps {
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// shows a single alert with its severity badge and message
export default function AlertCard({ message, severity }: AlertCardProps) {
  return (
    <div className="flex items-start gap-3 bg-gray-800 rounded-lg p-4">
      <Badge label={severity} severity={severity} />
      <p className="text-gray-200 text-sm">{message}</p>
    </div>
  );
}
