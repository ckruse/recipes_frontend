import clsx from "clsx";
import { getIn, useFormikContext } from "formik";
import DPicker, { type DatePickerProps } from "react-date-picker";
import { MdCalendarToday, MdClear } from "react-icons/md";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type TProps = DatePickerProps & {
  id?: string;
  name: string;
  onChange?: (date: Date) => void;
};

export function DatePicker(props: TProps) {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const value = getIn(values, props.name);

  function handleChange(date: Value) {
    if (date && !Array.isArray(date)) {
      setFieldValue(props.name, date);
      setFieldTouched(props.name, true);
    }
  }

  return (
    <DPicker
      clearIcon={<MdClear />}
      calendarIcon={<MdCalendarToday />}
      value={value}
      onChange={handleChange}
      {...props}
      className={clsx(props.className, "form-control")}
    />
  );
}
