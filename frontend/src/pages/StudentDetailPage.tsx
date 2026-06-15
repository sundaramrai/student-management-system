import { useParams, useNavigate } from "react-router-dom";
import { Edit2, ArrowLeft } from "lucide-react";
import { useStudent } from "@/hooks/useStudents";
import { Button, GenderBadge, Loader, PageHeader } from "@/components/ui";
import { getImageUrl } from "@/services/api";
import { formatDate, formatDateTime } from "@/utils/format";

const Field = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
      {label}
    </p>
    <p className="text-sm text-gray-900">{value}</p>
  </div>
);

export const StudentDetailPage = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: student, isLoading } = useStudent(id);

  if (isLoading) return <Loader />;
  if (!student) return <p className="text-gray-500">Student not found.</p>;

  const imageUrl = getImageUrl(student.photoUrl);

  return (
    <div className="max-w-3xl space-y-5">
      <PageHeader
        title={student.name}
        description={student.admissionNumber}
        action={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              size="sm"
              icon={<Edit2 className="w-4 h-4" />}
              onClick={() => navigate(`/students/${id}/edit`)}
            >
              Edit
            </Button>
          </div>
        }
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-300">
                  {student.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-sm font-mono text-indigo-600">
              {student.admissionNumber}
            </p>
            <div className="mt-2">
              <GenderBadge gender={student.gender} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-gray-100">
          <Field label="Email" value={student.email} />
          <Field label="Mobile Number" value={student.mobileNumber} />
          <Field label="Date of Birth" value={formatDate(student.dateOfBirth)} />
          <Field label="Course" value={student.course} />
          <Field label="Year" value={`Year ${student.year}`} />
          <Field label="Enrolled On" value={formatDateTime(student.createdAt)} />
          <div className="sm:col-span-2">
            <Field label="Address" value={student.address} />
          </div>
        </div>
      </div>
    </div>
  );
};
