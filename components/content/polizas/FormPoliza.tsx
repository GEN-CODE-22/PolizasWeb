import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { PolizaInput, polizaSchema } from "./polizaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectOption } from "rizzui";
import { useMedia } from "react-use";
import cn from "@/utils/class-names";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import {
  CreatePoliza,
  CreatePolizaAll,
  PolizasState,
} from "@/redux/slices/polizas";
import { AppState } from "@/redux/slices/app";
import moment from "moment";

export const FormPoliza = () => {
  const methods = useForm<PolizaInput>({
    resolver: zodResolver(polizaSchema),
  });

  const { user } = useSelector<StoreApp, AppState>((s) => s.app);

  let superU = user?.trim() === "contagrl" || user?.trim() === "fuente";

  console.log(superU);

  const { loading } = useSelector<StoreApp, PolizasState>((s) => s.polizas);

  const dispatch = useDispatch<AppDispatch>();

  const isMedium = useMedia("(max-width: 1200px)", false);

  const [poliza, setPoliza] = useState<SelectOption>({
    value: "A",
    label: "Conjunto de Polizas",
  });
  const [status, setStatus] = useState<SelectOption>({
    value: "P",
    label: "Pendiente",
  });

  const onSubmit: SubmitHandler<PolizaInput> = async (values) => {
    if (poliza.value === "A") {
      dispatch(
        CreatePolizaAll({
          Fecha: moment(values.fecha).format(),
          CreateBy: user,
        })
      );
    } else {
      dispatch(
        CreatePoliza({
          TipoPoliza:
            values.tipo === "V"
              ? 0
              : values.tipo === "L"
                ? 2
                : values.tipo === "C" && 1,
          Fecha: new Date(values.fecha),
          CreateBy: user,
        })
      );
    }
  };

  const { formState, trigger, register, setValue } = methods;
  const { errors } = formState;

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
    {
      value: "A",
      label: "Conjunto de Polizas",
    },
  ];

  const edo: SelectOption[] = [
    {
      value: "P",
      label: "Pendiente",
    },
    {
      value: "C",
      label: "Cancelada",
    },
    {
      value: "E",
      label: "Posteada",
    },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-5 lg:space-y-6 md:w-2/3 w-full  "
      >
        <div className="flex items-center justify-between">
          <Select
            label="Tipo de Poliza"
            className="[&>label>span]:font-medium"
            options={tipoPoliza}
            value={poliza}
            disabled={!superU}
            //    onChange={(e) => setPoliza(e.target.value as string)}
            onChange={(e) => {
              setPoliza(e as any);
              setValue("tipo", (e as any).value as any);
            }}
            selectClassName={cn(
              "h-16 outline-0 border-2 ring-0 border-gray-200 hover:!border-gray-100 hover:!ring-0 focus:border-gray-100 focus:!ring-0"
            )}
          />
        </div>

        <Input
          type="date"
          disabled={!superU}
          size={isMedium ? "lg" : "xl"}
          label="Fecha de Poliza"
          placeholder="Coloca la fecha de la poliza"
          className="[&>label>span]:font-medium"
          {...register("fecha")}
          error={errors.fecha?.message}
        />

        <div className="flex items-center justify-between">
          <Select
            label="Estatus"
            className="[&>label>span]:font-medium"
            options={edo}
            value={status}
            disabled
            //    onChange={(e) => setPoliza(e.target.value as string)}
            onChange={(e) => {
              setStatus(e as any);
              setValue("estatus", (e as any).value as any);
            }}
            selectClassName={cn(
              "h-16 outline-0 border-2 ring-0 border-gray-200 hover:!border-gray-100 hover:!ring-0 focus:border-gray-100 focus:!ring-0"
            )}
          />
        </div>

        <Button
          className={cn(
            " w-full",
            !superU && "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
          type="submit"
          size={isMedium ? "lg" : "xl"}
          isLoading={loading}
          disabled={!superU}
        >
          Crear Poliza
        </Button>
      </form>
    </FormProvider>
  );
};
