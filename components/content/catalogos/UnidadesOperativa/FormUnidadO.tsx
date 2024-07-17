import { AppDispatch } from "@reduxjs/toolkit";
import React, { FC, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultValues, UnidadOInput, unidadOSchema } from "./unidadOSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UnidadOp } from "@/interfaces";
import { Button, Checkbox, Input } from "rizzui";
import { SaveAndUpdateUnidad } from "@/helpers/catalogos";
import moment from "moment";
import toast from "react-hot-toast";
import { addUnidadOp } from "@/redux/slices/catalogos";

interface Props {
  unidad?: UnidadOp;
}

export const FormUnidadO: FC<Props> = ({ unidad }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<UnidadOInput>({
    resolver: zodResolver(unidadOSchema),
    defaultValues: defaultValues(unidad),
  });

  const onSubmit: SubmitHandler<UnidadOInput> = async (values) => {
    let unid: UnidadOp = {
      principal: !!values?.principal ? 1 : 0,
      createAt: moment().toDate(),
      descripcion: values.descripcion,
      cve_unidad: values.cve_unidad,
      id: values?.id ?? undefined,
    };

    setLoading(true);
    toast.loading("Guardando Cambios...");

    const unidad = await SaveAndUpdateUnidad(unid);

    setLoading(false);
    toast.dismiss();

    if (!!unidad) {
      toast.success("Cambios Guardados....");

      dispatch(addUnidadOp(unidad));
    }
  };

  const { formState, trigger, register } = methods;
  const { errors } = formState;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-3 space-y-3">
        <Input
          label="Clave Unidad"
          placeholder="Unidad Operativa"
          {...register("cve_unidad")}
          error={errors.cve_unidad?.message as string}
          type="text"
          onChange={() => trigger("cve_unidad")}
        />

        <Input
          label="Descripción"
          placeholder="Descripción de la Unidad Operativa "
          {...register("descripcion")}
          onChange={() => trigger("descripcion")}
          error={errors.descripcion?.message as string}
          type="text"
        />
        <Checkbox
          label="Principal"
          placeholder="Marcar si la unidad es la principal"
          {...register("principal")}
          onChange={() => trigger("principal")}
          error={errors.principal?.message as string}
        />

        <Button className="w-full " type="submit" isLoading={loading}>
          <span>Guardar</span>{" "}
        </Button>
      </form>
    </FormProvider>
  );
};
