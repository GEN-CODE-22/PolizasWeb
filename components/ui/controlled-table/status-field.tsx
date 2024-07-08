import cn from "@/utils/class-names";
import { FC } from "react";
import { Select, type SelectProps, type SelectOption } from "rizzui";

export const StatusField: FC<SelectProps<SelectOption>> = ({
  placeholder = "Select status",
  dropdownClassName,
  ...props
}) => {
  return (
    <Select
      inPortal={false}
      placeholder={placeholder}
      selectClassName="h-9 min-w-[150px]"
      dropdownClassName={cn("p-1.5 !z-0", dropdownClassName)}
      optionClassName="h-9"
      {...props}
    />
  );
};
