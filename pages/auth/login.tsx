import AuthWrapperFour from "@/components/AuthLayout/auth-wrapper-four";
import { SignInForm } from "@/components/AuthLayout/sing";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Login = () => {
  return (
    <AuthWrapperFour
      title={
        <>
          Welcome Back! <br /> Inicia Sesión.
        </>
      }
      isSignIn
      isSocialLoginActive={true}
    >
      <SignInForm />
    </AuthWrapperFour>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);

  const { p = "/" } = query;

  if (!!session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
