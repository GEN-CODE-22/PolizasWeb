import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CajaCuentaInput, cajaSchema, defaultValues } from "./cajaSchema";
import { CajaCuentas } from "@/interfaces";
import { Button, Input } from "rizzui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { CatalogosState, UpdateCajaCuentas } from "@/redux/slices/catalogos";

interface Props {
  cajaCuenta: CajaCuentas;
}
export const FormCajaCuenta: FC<Props> = ({ cajaCuenta }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { cuentasContable } = useSelector<StoreApp, CatalogosState>(
    (s) => s.catalogos
  );

  const methods = useForm<CajaCuentaInput>({
    resolver: zodResolver(cajaSchema),
    defaultValues: defaultValues(cajaCuenta),
  });

  const onSubmit: SubmitHandler<CajaCuentaInput> = (values) => {
    dispatch(UpdateCajaCuentas(values as any));
  };

  const { formState, trigger, register } = methods;
  const { errors } = formState;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3 space-y-3">
        <Input
          label="No Cuenta"
          placeholder="Numero de cuenta"
          {...methods.register("cta_cta")}
          error={errors.cta_cta?.message as string}
          type="text"
        />
        <Input
          label="Descripción"
          placeholder="Descripción"
          {...methods.register("desc_cta")}
          error={errors.cta_cta?.message as string}
          type="text"
        />
        <>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Cuentas
          </label>

          {errors.cont_cta?.id?.message && (
            <label className="block  text-sm font-bold text-red-800">
              {errors.cont_cta?.id?.message}
            </label>
          )}

          <select
            {...register("cont_cta.id")}
            onBlur={() => trigger("cont_cta.id")}
            className="w-full block   text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          >
            <option value="">Selecciona </option>
            {cuentasContable.map((o) => (
              <option key={o.id} value={o.id}>
                {o.cuenta}-{o.descripcion}
              </option>
            ))}
          </select>
        </>

        <Button className="w-full " type="submit">
          <span>Guardar</span>{" "}
        </Button>
      </form>
    </FormProvider>
  );
};
