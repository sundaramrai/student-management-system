import { ADMISSION } from "../constants/index.js";

export const generateAdmissionNumber = (sequence: number): string => {
  const year = new Date().getFullYear();
  const paddedSeq = String(sequence).padStart(4, "0");
  return `${ADMISSION.PREFIX}-${year}-${paddedSeq}`;
};

export const parseSequenceFromAdmissionNumber = (admissionNumber: string): number => {
  const parts = admissionNumber.split("-");
  const seqPart = parts[2];
  if (!seqPart) return 0;
  return parseInt(seqPart, 10);
};
