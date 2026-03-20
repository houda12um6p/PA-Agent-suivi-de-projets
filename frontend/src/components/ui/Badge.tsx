interface BadgeProps {
  label: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const colors = {
  low:      'bg-gray-600 text-gray-100',
  medium:   'bg-yellow-500 text-yellow-950',
  high:     'bg-orange-500 text-white',
  critical: 'bg-red-600 text-white',
};

export default function Badge({ label, severity }: BadgeProps) {
  return (
    <span className={`
      inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
      ${colors[severity]}
    `}>
      {label}
    </span>
  );
}
