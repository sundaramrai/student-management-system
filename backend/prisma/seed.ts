import { prisma } from "../src/config/prisma.js";

type Gender = "MALE" | "FEMALE" | "OTHER";

const courses = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Data Science",
  "Civil Engineering",
  "Mathematics",
  "Physics",
];

const genders: Gender[] = ["MALE", "FEMALE", "OTHER"];

const firstNames = [
  "Aarav", "Priya", "Rohan", "Ananya", "Vikram",
  "Sneha", "Arjun", "Deepika", "Karan", "Meera",
  "Rahul", "Pooja", "Siddharth", "Divya", "Amit",
  "Shreya", "Nikhil", "Kavya", "Rajesh", "Tanvi",
];

const lastNames = [
  "Sharma", "Patel", "Singh", "Kumar", "Gupta",
  "Mehta", "Joshi", "Verma", "Nair", "Reddy",
];

const generateMobile = (i: number): string => `+91${9800000000 + i}`;

const generateDOB = (i: number): Date => {
  const year = 2000 + (i % 5);
  const month = (i % 12) + 1;
  const day = (i % 28) + 1;
  return new Date(
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  );
};

async function main(): Promise<void> {
  await prisma.activityLog.deleteMany();
  await prisma.student.deleteMany();

  for (let i = 0; i < 20; i++) {
    const firstName = firstNames[i % firstNames.length] ?? "Student";
    const lastName = lastNames[i % lastNames.length] ?? "User";
    const name = `${firstName} ${lastName}`;
    const course = courses[i % courses.length] ?? "Computer Science";
    const gender = genders[i % genders.length] ?? "MALE";
    const year = (i % 4) + 1;
    const paddedSeq = String(i + 1).padStart(4, "0");
    const admissionNumber = `ADM-2026-${paddedSeq}`;

    const student = await prisma.student.create({
      data: {
        admissionNumber,
        name,
        course,
        year,
        dateOfBirth: generateDOB(i),
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@university.edu`,
        mobileNumber: generateMobile(i),
        gender,
        address: `${100 + i} University Road, Bangalore, Karnataka 560001`,
      },
    });

    await prisma.activityLog.create({
      data: { studentId: student.id, action: "Student Created" },
    });
  }

  console.log("Seeded 20 students successfully");
}

try {
  await main();
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
