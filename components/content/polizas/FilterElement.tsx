import DateFiled from "@/components/ui/controlled-table/date-field";
import { StatusField } from "@/components/ui/controlled-table/status-field";
import { PolizasState, setFiltros } from "@/redux/slices/polizas";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import moment from "moment";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import { SelectOption } from "rizzui";

interface Props {
  [x: string]: any;
}

export const FilterElement: FC<Props> = (props) => {
  moment.locale("es");

  const dispatch = useDispatch<AppDispatch>();

  const { FechaFin, FechaInicio, tipoP } = useSelector<StoreApp, PolizasState>(
    (s) => s.polizas
  );

  const isMediumScreen = useMedia("(max-width: 1860px)", false);

  const onChangeI = (date: any) => {
    dispatch(setFiltros({ FechaInicio: date }));
  };

  const onChangeF = (date: any) => {
    dispatch(setFiltros({ FechaFin: date }));
  };
  const onChangeT = (tipo: string) => {
    dispatch(setFiltros({ tipoP: tipo }));
  };

  const tipoPoliza: SelectOption[] = [
    {
      value: "C",
      label: "Facturas Canceladas",
    },
    {
      value: "V",
      label: "Poliza Ventas",
    },
    {
      value: "L",
      label: "Poliza Cobranza",
    },
  ];

  return (
    <div>
      <DateFiled
        className="w-full"
        selected={FechaInicio}
        onChange={(date: Date) => onChangeI(date)}
        placeholderText="Fecha Inicio"
        dateFormat={"yyyy-MM-dd hh:mm:ss"}
        {...(isMediumScreen && {
          inputProps: {
            label: "Fecha Inicio",
            labelClassName: "font-medium text-gray-700",
          },
        })}
      />
      <DateFiled
        className="w-full"
        selected={FechaFin}
        onChange={(date: Date) => onChangeF(date)}
        dateFormat={"yyyy-MM-dd hh:mm:ss"}
        placeholderText="Fecha Fin"
        {...(isMediumScreen && {
          inputProps: {
            label: "Fecha Fin",
            labelClassName: "font-medium text-gray-700",
          },
        })}
      />

      <StatusField
        options={tipoPoliza}
        value={tipoPoliza.find((p) => p.value === tipoP)}
        onChange={(c: string) => onChangeT(c)}
        getOptionValue={(option: { value: any }) => option.value}
        dropdownClassName="!z-10"
        placeholder="Tipo de poliza"
        disabled
        className={"w-auto"}
        {...(isMediumScreen && {
          label: "Tipo de Poliza",
          labelClassName: "font-medium text-gray-700",
        })}
      />
    </div>
  );
};
