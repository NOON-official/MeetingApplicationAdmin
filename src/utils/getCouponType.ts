import { CouponTypes } from '@/config/constants';

export default function getCouponType(id: number) {
  return CouponTypes.find((c) => c.id === id);
}
