import { GetServerSideProps } from "next";
import React, { FC, useEffect } from "react";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import { DetallePoliza } from "@/components/content/polizas/DetallePoliza";
import { GetPolizaID, PolizasState } from "@/redux/slices/polizas";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "@/components/ui/page-header";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { CardPoliza } from "@/components/content/polizas/CardPoliza";
import { AppState } from "@/redux/slices/app";

interface Props {
  pageProps: { poliza: number };
}

const Poliza: FC<Props> = ({ pageProps: { poliza } }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { breadcrumb } = useSelector<StoreApp, AppState>((s) => s.app);

  const { currentPoliza } = useSelector<StoreApp, PolizasState>(
    (s) => s.polizas
  );

  useEffect(() => {
    if (poliza && !currentPoliza) GetData();
  }, [poliza]);

  const GetData = () => dispatch(GetPolizaID(poliza));

  return (
    <DefaultLayout>
      <PageHeader title={"Entradas Contable"} breadcrumb={breadcrumb} />
      <CardPoliza />
      <DetallePoliza />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { poliza } = query;

  if (!poliza) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      poliza,
    },
  };
};

export default Poliza;
