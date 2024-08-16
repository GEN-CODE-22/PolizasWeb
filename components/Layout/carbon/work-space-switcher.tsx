import { AppState, setServer } from "@/redux/slices/app";
import { CatalogosState } from "@/redux/slices/catalogos";
import cn from "@/utils/class-names";
import { AppDispatch, StoreApp } from "@reduxjs/toolkit";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Avatar, Select, type SelectOption } from "rizzui";

interface Props {
  className?: string;
  selectClassName?: string;
  dropdownClassName?: string;
  suffixClassName?: string;
}

export const WorkSpaceSwitcher: FC<Props> = ({
  className,
  selectClassName,
  dropdownClassName,
  suffixClassName,
}) => {
  const { server, serverAuth } = useSelector<StoreApp, AppState>((s) => s.app);

  const { servidores } = useSelector<StoreApp, CatalogosState>(
    (s) => s.catalogos
  );

  const [values, setValues] = useState<SelectOption>();

  const dispatch = useDispatch<AppDispatch>();

  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    setOptions(
      serverAuth.map((c) => {
        return {
          label: c,
          value: c,
        };
      })
    );
  }, [serverAuth]);

  useEffect(() => {
    if (!!server && !values) {
      setValues({
        label: server,
        value: server,
      });
    }
  }, [server]);

  const onChange = (value: SelectOption) => {
    window?.sessionStorage?.setItem("server", value.value.toString());
    dispatch(setServer(value.value.toString()));
    setValues(value);
  };

  return (
    <Select
      options={options}
      value={values}
      onChange={onChange}
      displayValue={(value: SelectOption) => renderDisplayValue(value)}
      getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
      selectClassName={cn(
        "h-16 outline-0 border-2 ring-0 border-gray-100 hover:!border-gray-100 hover:!ring-0 focus:border-gray-100 focus:!ring-0",
        selectClassName
      )}
      // disabled
      className={cn(className)}
      dropdownClassName={cn("z-[9999] max-w-[250px]", dropdownClassName)}
      suffixClassName={suffixClassName}
      optionClassName={cn("dark:hover:bg-gray-300")}
    />
  );
};

function renderDisplayValue(value: SelectOption) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={value?.label} src={value?.avatar} size="sm" />
      <div>
        <Text fontWeight="medium" className="text-gray-900">
          {value.label}
        </Text>
        <Text className="text-gray-500">Espacio de Trabajo</Text>
      </div>
    </div>
  );
}

function renderOptionDisplayValue(option: SelectOption) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={option.label} src={option.avatar} size="sm" />
      <div>
        <Text fontWeight="medium">{option.label}</Text>
        <Text>{option.value}</Text>
      </div>
    </div>
  );
}
