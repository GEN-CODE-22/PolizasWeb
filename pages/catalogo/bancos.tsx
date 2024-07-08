import DefaultLayout from "@/components/Layout/LayoutProvider";
import { CajaCuentasContent } from "@/components/content/catalogos/CajaCuentas/CajaCuentasContent";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Bancos = () => {
  return (
    <DefaultLayout>
      <CajaCuentasContent />
    </DefaultLayout>
  );
};

export default Bancos;
