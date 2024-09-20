"use client";

import { PolizasContent } from "@/components/content/polizas";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import PageHeader from "@/components/ui/page-header";
import { StoreApp } from "@/redux";
import { AppState } from "@/redux/slices/app";

import { useSelector } from "react-redux";

const ListPolizas = () => {
  const { breadcrumb } = useSelector<StoreApp, AppState>((s) => s.app);

  return (
    <DefaultLayout>
      <PageHeader title={"Polizas Ventas"} breadcrumb={breadcrumb} />

      <PolizasContent tipo={"V"} />
    </DefaultLayout>
  );
};

export default ListPolizas;
