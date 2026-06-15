import { useNavigate } from "react-router-dom";
import { StudentForm, StudentFormOutput } from "@/features/students/StudentForm";
import { useCreateStudent } from "@/hooks/useStudents";
import { PageHeader } from "@/components/ui";

export const AddStudentPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: createStudent, isPending } = useCreateStudent();

  const handleSubmit = async (values: StudentFormOutput, photo?: File) => {
    await createStudent({ ...values, photo });
    navigate("/students");
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Add Student" description="Enroll a new student in the system." />
      <StudentForm onSubmit={handleSubmit} isSubmitting={isPending} submitLabel="Create Student" />
    </div>
  );
};
