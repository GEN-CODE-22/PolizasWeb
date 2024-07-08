import { setUser } from "@/redux/slices/app";
import { GetServidores } from "@/redux/slices/catalogos";
import { AppDispatch } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
  [key: string]: any;
}

export default function Auth({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      let { user, server } = session as any;
      dispatch(setUser({ user, server }));
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
