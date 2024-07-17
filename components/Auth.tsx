import { setUser } from "@/redux/slices/app";
import { GetServidores } from "@/redux/slices/catalogos";
import { AppDispatch } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loader } from "rizzui";

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
      console.log(session);
      let { user, server } = (session as any).user;
      dispatch(setUser({ user, server }));
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <Loader variant="threeDot" size="xl" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
