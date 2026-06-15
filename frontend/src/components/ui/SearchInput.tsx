import { Search, X } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = ({
  onClear,
  className,
  value,
  ...props
}: SearchInputProps) => (
  <div className={clsx("relative", className)}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    <input
      value={value}
      className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400
        placeholder:text-gray-400 transition-colors"
      {...props}
    />
    {value && onClear && (
      <button
        onClick={onClear}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);
