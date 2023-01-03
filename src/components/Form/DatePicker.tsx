import clsx from "clsx";
import { getIn, useFormikContext } from "formik";
import DPicker, { DatePickerProps } from "react-date-picker";
import Icon from "react-icons-kit";
import { ic_calendar_today, ic_clear } from "react-icons-kit/md";

type TProps = DatePickerProps & {
  id?: string;
  name: string;
  onChange?: (date: Date) => void;
};

export function DatePicker(props: TProps) {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const value = getIn(values, props.name);

  function handleChange(date: Date) {
    setFieldValue(props.name, date);
    setFieldTouched(props.name, true);
  }

  return (
    <DPicker
      clearIcon={<Icon icon={ic_clear} />}
      calendarIcon={<Icon icon={ic_calendar_today} />}
      value={value}
      onChange={handleChange}
      {...props}
      className={clsx(props.className, "form-control")}
    />
  );
}
