import { ReactNode } from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export const EmptyState = ({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 gap-4">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
      {icon ?? <FolderOpen className="w-8 h-8" />}
    </div>
    <div className="text-center">
      <p className="text-base font-medium text-gray-900">{title}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
    {action}
  </div>
);
