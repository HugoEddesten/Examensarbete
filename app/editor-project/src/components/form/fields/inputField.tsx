import { Input } from "@/components/ui/input";
import { FieldDef } from "../dynamicForm";
import { ChangeEvent } from "react";

export default function InputField<TModel>({
  field,
  value,
  onChange,
}: {
  field: FieldDef<TModel>;
  value: any;
  onChange: (event: ChangeEvent<any>) => void;
}) {
  return (
    <div className="flex flex-col">
      <label>{field.name}</label>
      <Input autoComplete="off" className="" onChange={onChange} name={field.key.toString()} value={value}/>
    </div>
  )
}
