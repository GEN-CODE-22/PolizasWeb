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
  AjustePolizaDiaAbierto,
  CreatePoliza,
  PolizasState,
} from "@/redux/slices/polizas";
import { AppState } from "@/redux/slices/app";
import moment from "moment";

export const FormPoliza = () => {
  const methods = useForm<PolizaInput>({
    resolver: zodResolver(polizaSchema),
    defaultValues: {
      tipo: "X",
    },
  });

  const { user } = useSelector<StoreApp, AppState>((s) => s.app);
  const isFuente =
    user?.usr_ucve?.trim() === "fuente" ||
    user?.usr_ucve?.trim() === "contagrl";

  const { loading } = useSelector<StoreApp, PolizasState>((s) => s.polizas);
  const dispatch = useDispatch<AppDispatch>();
  const isMedium = useMedia("(max-width: 1200px)", false);

  const [poliza, setPoliza] = useState<SelectOption>({
    value: "X",
    label: "Ajustes de Poliza",
  });
  const [status, setStatus] = useState<SelectOption>({
    value: "P",
    label: "Pendiente",
  });

  const onSubmit: SubmitHandler<PolizaInput> = async (values) => {
    if (poliza.value === "X") {
      dispatch(AjustePolizaDiaAbierto(moment(values.fecha).toDate()));
    } else {
      dispatch(
        CreatePoliza({
          TipoPoliza:
            values.tipo === "V"
              ? 0
              : values.tipo === "L"
                ? 2
                : values.tipo === "C"
                  ? 1
                  : undefined,
          Fecha: new Date(values.fecha),
          CreateBy: user,
        })
      );
    }
  };

  const { formState, register, setValue, watch } = methods;
  const { errors } = formState;

  const tipoPoliza: SelectOption[] = isFuente
    ? [
        { value: "X", label: "Ajustes de Poliza" },
        { value: "C", label: "Facturas Canceladas" },
        { value: "V", label: "Poliza Ventas" },
        { value: "L", label: "Poliza Cobranza" },
        { value: "A", label: "Conjunto de Polizas" },
      ]
    : [{ value: "X", label: "Ajustes de Poliza" }];

  const edo: SelectOption[] = [
    { value: "P", label: "Pendiente" },
    { value: "C", label: "Cancelada" },
    { value: "E", label: "Posteada" },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-5 lg:space-y-6 md:w-2/3 w-full"
      >
        <Select
          label="Tipo de Poliza"
          className="[&>label>span]:font-medium"
          options={tipoPoliza}
          value={poliza}
          onChange={(e) => {
            setPoliza(e as any);
            setValue("tipo", (e as any).value as any);
          }}
          selectClassName={cn(
            "h-16 outline-0 border-2 border-gray-200 hover:border-gray-100 focus:border-gray-100"
          )}
        />

        <Input
          type="date"
          size={isMedium ? "lg" : "xl"}
          label="Fecha de Poliza"
          placeholder="Coloca la fecha de la poliza"
          className="[&>label>span]:font-medium"
          {...register("fecha")}
          error={errors.fecha?.message}
        />

        <Select
          label="Estatus"
          className="[&>label>span]:font-medium"
          options={edo}
          value={status}
          disabled
          onChange={(e) => {
            setStatus(e as any);
            setValue("estatus", (e as any).value as any);
          }}
          selectClassName={cn(
            "h-16 outline-0 border-2 border-gray-200 hover:border-gray-100 focus:border-gray-100"
          )}
        />

        <Button
          className="w-full"
          type="submit"
          size={isMedium ? "lg" : "xl"}
          isLoading={loading}
        >
          {poliza.value === "X" ? "Ajuste de Polizas" : "Crear Poliza"}
        </Button>
      </form>
    </FormProvider>
  );
};
