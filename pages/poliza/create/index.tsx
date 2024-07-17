import { FormPoliza } from "@/components/content/polizas/FormPoliza";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const CreatePoliza = () => {
  return (
    <DefaultLayout>
      <FormPoliza />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);

  const { p = "/auth/login" } = query;

  if (!session) {
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

export default CreatePoliza;
