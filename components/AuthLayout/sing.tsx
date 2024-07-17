import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Password, Button, Input, SelectOption, Select } from "rizzui";
import { useMedia } from "@/hooks/use-media";
import { AuthInput, authSchema } from "./authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { StoreApp } from "@reduxjs/toolkit";
import { CatalogosState } from "@/redux/slices/catalogos";
import { useEffect, useState } from "react";
import cn from "@/utils/class-names";
import { signIn } from "next-auth/react";

export const SignInForm = () => {
  const methods = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
  });

  const { servidores } = useSelector<StoreApp, CatalogosState>(
    (s) => s.catalogos
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [serverCheck, setServerCheck] = useState<string>();

  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    setOptions(
      servidores.map((c) => {
        return {
          label: c,
          value: c,
        };
      })
    );
  }, [servidores]);

  const isMedium = useMedia("(max-width: 1200px)", false);

  const { formState, trigger, register } = methods;
  const { errors } = formState;

  const onSubmit: SubmitHandler<AuthInput> = async (values) => {
    setLoading(true);
    await signIn("credentials", { ...values, server: serverCheck });
    setLoading(false);
  };

  const onChange = (value: SelectOption) => {
    if (value.value) {
      setServerCheck(value.value as string);
      window?.sessionStorage.setItem("server", value.value.toString());
    }
  };

  return (
    <div className="xl:pe-12 2xl:pe-20">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-5 lg:space-y-6"
        >
          <Input
            type="text"
            size={isMedium ? "lg" : "xl"}
            label="Usuario"
            placeholder="Ingresa con tu usuario"
            className="[&>label>span]:font-medium"
            {...register("user")}
            error={errors.user?.message}
          />
          <Password
            label="Password"
            placeholder="Enter your password"
            size={isMedium ? "lg" : "xl"}
            className="[&>label>span]:font-medium"
            {...register("password")}
            error={errors.password?.message}
          />
          <div className="flex items-center justify-between">
            <Select
              label="Servidor"
              className="[&>label>span]:font-medium"
              options={options}
              value={options.find((e) => e.value === serverCheck)}
              onChange={onChange}
              selectClassName={cn(
                "h-16 outline-0 border-2 ring-0 border-gray-200 hover:!border-gray-100 hover:!ring-0 focus:border-gray-100 focus:!ring-0"
              )}
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            size={isMedium ? "lg" : "xl"}
            isLoading={loading}
          >
            Sign In
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
