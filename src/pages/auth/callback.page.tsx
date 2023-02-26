import { setAccessToken } from "@/features/user";
import useAppDispatch from "@/hooks/useAppDispatch";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const { push, query } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { access } = query;
    if (access) {
      dispatch(setAccessToken(access));
      push(`/`);
    }
  }, [dispatch, push, query]);

  return null;
}
