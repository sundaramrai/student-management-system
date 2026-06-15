import { useParams, useNavigate } from "react-router-dom";
import { StudentForm, StudentFormOutput } from "@/features/students/StudentForm";
import { useStudent, useUpdateStudent } from "@/hooks/useStudents";
import { PageHeader, Loader } from "@/components/ui";

export const EditStudentPage = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: student, isLoading } = useStudent(id);
  const { mutateAsync: updateStudent, isPending } = useUpdateStudent(id);

  const handleSubmit = async (values: StudentFormOutput, photo?: File) => {
    await updateStudent({ ...values, photo });
    navigate("/students");
  };

  if (isLoading) return <Loader />;
  if (!student) return <p className="text-gray-500">Student not found.</p>;

  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Edit Student" description={`Editing ${student.name} (${student.admissionNumber})`} />
      <StudentForm
        defaultValues={student}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Save Changes"
      />
    </div>
  );
};
