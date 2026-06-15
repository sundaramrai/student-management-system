import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, Eye } from "lucide-react";
import { Student } from "@/types";
import { GenderBadge, ConfirmModal, EmptyState } from "@/components/ui";
import { getImageUrl } from "@/services/api";
import { formatDate } from "@/utils/format";
import { useDeleteStudent } from "@/hooks/useStudents";

interface StudentTableProps {
  students: Student[];
}

const Avatar = ({ student }: { student: Student }) => {
  const imageUrl = getImageUrl(student.photoUrl);
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={student.name}
        className="w-9 h-9 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
      <span className="text-xs font-semibold text-indigo-600">
        {student.name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export const StudentTable = ({ students }: StudentTableProps) => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { mutateAsync: deleteStudent, isPending } = useDeleteStudent();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteStudent(deleteId);
    setDeleteId(null);
  };

  if (students.length === 0) {
    return (
      <EmptyState
        title="No students found"
        description="Try adjusting your search or filter criteria."
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b border-gray-100">
              {["Student", "Admission No.", "Course", "Year", "Email", "Mobile", "Gender", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar student={student} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(student.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-mono text-gray-600">
                    {student.admissionNumber}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {student.course}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  Year {student.year}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {student.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {student.mobileNumber}
                </td>
                <td className="px-4 py-3">
                  <GenderBadge gender={student.gender} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => navigate(`/students/${student.id}`)}
                      className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/students/${student.id}/edit`)}
                      className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(student.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        loading={isPending}
      />
    </>
  );
};
