import { Areas } from '@/config/constants';

export default function getArea(id: number) {
  return Areas.find((u) => u.id === id);
}
