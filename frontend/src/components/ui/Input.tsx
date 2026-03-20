interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={name} className="text-sm text-white font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2 rounded bg-primary text-white text-sm
          border outline-none transition-colors
          ${error ? 'border-red-500' : 'border-gray-600 focus:border-accent'}
        `}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
