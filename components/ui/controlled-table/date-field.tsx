import moment from "moment";
import { DatePicker, DatePickerProps } from "../datepicker";

export default function DateFiled({
  onClear,
  placeholderText = "Select date",
  inputProps,
  ...props
}: DatePickerProps<any> & { onClear?: () => void }) {
  moment.locale("es");
  return (
    <div>
      <DatePicker
        placeholderText={placeholderText}
        inputProps={{
          inputClassName: "h-9 [&_input]:text-ellipsis",
          ...inputProps,
        }}
        className="w-72"
        {...props}
      />
    </div>
  );
}
