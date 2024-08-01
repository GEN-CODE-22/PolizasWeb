import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CuentaCInput, cuentasCSchema, defaultValues } from "./cuentaCSchema";
import { CuentasContable } from "@/interfaces";
import { Button, Input } from "rizzui";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@reduxjs/toolkit";
import { UpdateCuentaC } from "@/redux/slices/catalogos";
import SimpleBar from "simplebar-react";

interface Props {
  cuentaC?: CuentasContable;
}

export const FormCuentaC: FC<Props> = ({ cuentaC }) => {
  const dispatch = useDispatch<AppDispatch>();

  const methods = useForm<CuentaCInput>({
    resolver: zodResolver(cuentasCSchema),
    defaultValues: defaultValues(cuentaC),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<CuentaCInput> = (values) => {
    dispatch(UpdateCuentaC(values as any));
  };

  const { formState, trigger, register } = methods;
  const { errors } = formState;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3 space-y-3">
        <Input
          label="Cuenta Contable"
          placeholder="Cuenta Contable"
          {...register("cuenta")}
          error={errors.cuenta?.message as string}
          type="text"
          onChange={() => trigger("cuenta")}
        />
        <Input
          label="Tipo"
          placeholder="Abreviación "
          {...register("tipo")}
          onChange={() => trigger("tipo")}
          error={errors.tipo?.message as string}
          type="text"
        />
        <Input
          label="Descripción"
          placeholder="Descripción de la cuenta "
          {...register("descripcion")}
          onChange={() => trigger("descripcion")}
          error={errors.descripcion?.message as string}
          type="text"
        />

        <Button className="w-full " type="submit">
          <span>Guardar</span>{" "}
        </Button>
      </form>
    </FormProvider>
  );
};
