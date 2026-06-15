import { Loader2 } from "lucide-react";

interface LoaderProps {
  text?: string;
}

export const Loader = ({ text = "Loading..." }: LoaderProps) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3">
    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
    <p className="text-sm text-gray-500">{text}</p>
  </div>
);

export const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white">
    <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
  </div>
);
