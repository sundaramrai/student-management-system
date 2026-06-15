import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Upload, User } from "lucide-react";
import { Input, Select, TextArea, Button } from "@/components/ui";
import { Student } from "@/types";
import { getImageUrl } from "@/services/api";

// Keep all fields as strings in the form; convert numerics in onSubmit
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  course: z.string().min(2, "Course must be at least 2 characters"),
  year: z.string().refine((v) => {
    const n = parseInt(v, 10);
    return n >= 1 && n <= 6;
  }, "Year must be between 1 and 6"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid mobile number"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type RawFormValues = z.infer<typeof schema>;

export interface StudentFormOutput {
  name: string;
  course: string;
  year: number;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
}

const yearOptions = [1, 2, 3, 4, 5, 6].map((y) => ({
  value: String(y),
  label: `Year ${y}`,
}));

const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

interface StudentFormProps {
  defaultValues?: Partial<Student>;
  onSubmit: (values: StudentFormOutput, photo?: File) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}

export const StudentForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}: StudentFormProps) => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    defaultValues?.photoUrl ? getImageUrl(defaultValues.photoUrl) : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RawFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      course: defaultValues?.course ?? "",
      year: defaultValues?.year ? String(defaultValues.year) : "1",
      dateOfBirth: defaultValues?.dateOfBirth
        ? new Date(defaultValues.dateOfBirth).toISOString().split("T")[0]
        : "",
      email: defaultValues?.email ?? "",
      mobileNumber: defaultValues?.mobileNumber ?? "",
      gender: defaultValues?.gender ?? "MALE",
      address: defaultValues?.address ?? "",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      alert("Only JPG, JPEG, and PNG files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (raw: RawFormValues) => {
    const output: StudentFormOutput = {
      ...raw,
      year: Number.parseInt(raw.year, 10),
      gender: raw.gender,
    };
    await onSubmit(output, photo ?? undefined);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Student Photo</h3>
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center shrink-0">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-gray-300" />
            )}
          </div>
          <div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={<Upload className="w-4 h-4" />}
              onClick={() => fileInputRef.current?.click()}
            >
              {photoPreview ? "Change Photo" : "Upload Photo"}
            </Button>
            <p className="text-xs text-gray-500 mt-1.5">JPG, JPEG or PNG. Max 5MB.</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" required placeholder="Aarav Sharma" error={errors.name?.message} {...register("name")} />
          <Input label="Email Address" type="email" required placeholder="aarav@university.edu" error={errors.email?.message} {...register("email")} />
          <Input label="Mobile Number" required placeholder="+919800000001" error={errors.mobileNumber?.message} {...register("mobileNumber")} />
          <Input label="Date of Birth" type="date" required error={errors.dateOfBirth?.message} {...register("dateOfBirth")} />
          <Select label="Gender" required options={genderOptions} error={errors.gender?.message} {...register("gender")} />
        </div>
        <div className="mt-4">
          <TextArea label="Address" required placeholder="123 University Road, Bangalore, Karnataka 560001" error={errors.address?.message} {...register("address")} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Academic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Course" required placeholder="Computer Science" error={errors.course?.message} {...register("course")} />
          <Select label="Year" required options={yearOptions} error={errors.year?.message} {...register("year")} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => navigate(-1)} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
