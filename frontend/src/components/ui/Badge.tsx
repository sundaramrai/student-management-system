import { clsx } from "clsx";
import { Gender } from "@/types";

interface BadgeProps {
  children: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variantClasses = {
  default: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

export const Badge = ({ children, variant = "default" }: BadgeProps) => (
  <span
    className={clsx(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
      variantClasses[variant]
    )}
  >
    {children}
  </span>
);

const genderVariants: Record<Gender, BadgeProps["variant"]> = {
  MALE: "info",
  FEMALE: "success",
  OTHER: "warning",
};

const genderLabels: Record<Gender, string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

export const GenderBadge = ({ gender }: { gender: Gender }) => (
  <Badge variant={genderVariants[gender]}>{genderLabels[gender]}</Badge>
);
