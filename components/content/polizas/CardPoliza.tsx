import { PolizasState } from "@/redux/slices/polizas";
import { StoreApp } from "@reduxjs/toolkit";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Text } from "rizzui";

export const CardPoliza = () => {
  const { currentPoliza } = useSelector<StoreApp, PolizasState>(
    (s) => s.polizas
  );

  return (
    <div className="grid grid-cols-4 gap-5 @2xl:grid-cols-2 @[90rem]:grid-cols-4 3xl:gap-8 pb-6 ">
      <div className="text-center">
        <p className="text-2xl font-extrabold">Tipo de Poliza</p>
        <p className="font-bold text-xl">
          {currentPoliza?.tipo === "V"
            ? "Ventas"
            : currentPoliza?.tipo === "L"
              ? "Cobranza"
              : "Facturas Canceladas"}
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-extrabold">Fecha</p>
        <p className="font-bold text-xl">
          {moment(currentPoliza?.createAt).format("yyyy-MM-DD")}
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-extrabold">Creada por:</p>
        <p className="font-bold text-xl">{currentPoliza?.createBy}</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-extrabold">Estatus</p>

        <div className="flex justify-center ">
          <Text className="ms-2 font-bold text-xl text-orange-dark">
            {currentPoliza?.estatus == "P"
              ? "Pendiente"
              : currentPoliza?.estatus === "C"
                ? " Cancelada"
                : "Posteada"}
          </Text>
        </div>
      </div>
    </div>
  );
};
