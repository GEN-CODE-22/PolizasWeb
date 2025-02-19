import { AuthSesion } from "@/interfaces";
import { setUser } from "@/redux/slices/app";
import { AppDispatch } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loader } from "rizzui";

export default function Auth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      let data = session.user as AuthSesion;

      console.log(data);
      dispatch(
        setUser({ user: data.user as any, serverAuth: data.serversAuth })
      );
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
}
