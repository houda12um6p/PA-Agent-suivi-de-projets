interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const styles = {
  primary:   'bg-accent text-white hover:bg-green-600',
  secondary: 'border border-accent text-accent hover:bg-accent hover:text-white',
  danger:    'bg-red-600 text-white hover:bg-red-700',
};

export default function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2 rounded font-semibold text-sm transition-colors
        ${styles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {label}
    </button>
  );
}
