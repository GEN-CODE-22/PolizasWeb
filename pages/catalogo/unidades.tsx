import DefaultLayout from "@/components/Layout/LayoutProvider";
import { UnidadesOperativaContent } from "@/components/content/catalogos/UnidadesOperativa/UnidadesOperativaContent";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Unidades = () => {
  return (
    <DefaultLayout>
      <UnidadesOperativaContent />
    </DefaultLayout>
  );
};

export default Unidades;
