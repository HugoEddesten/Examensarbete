import { Input } from "@/components/ui/input";
import { FieldDef } from "../dynamicForm";
import { ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaField<TModel>({
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
      <Textarea autoComplete="null" className="" onChange={onChange} name={field.key.toString()} value={value}/>
    </div>
  )
}