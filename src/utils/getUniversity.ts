import universities from "@/config/universities.json";

export default function getUniversity(id: number) {
  return universities.find((u) => u.id === id);
}
