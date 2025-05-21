import InputField from "./fields/inputField";
import TextareaField from "./fields/textareaField";
import { ChangeEvent, useEffect, useState } from "react";

export const FieldTypes = {
  INPUT: "input",
  TEXTAREA: "textarea",
} as const;

export type FieldDef<TModel> = {
  key: keyof TModel;
  name: string;
  type: (typeof FieldTypes)[keyof typeof FieldTypes];
};

interface DynamicFormOptions<TModel extends {}> {
  excludedProperties?: (keyof TModel)[];
}

export default function DynamicForm<TModel extends {}>({
  formModel,
  onChange,
  fieldDefinitions,
  options,
}: {
  formModel: TModel;
  onChange: (value: any, key: string) => void;
  fieldDefinitions: FieldDef<TModel>[];
  options?: DynamicFormOptions<TModel>;
}) {
  const modelKeys = Object.keys(formModel) as (keyof TModel)[];

  return modelKeys.map((k) => {
    if (!fieldDefinitions.some((def) => def.key === k)) return undefined;
    if (options?.excludedProperties && options.excludedProperties.includes(k))
      return undefined;

    const currentDef = fieldDefinitions.find((def) => def.key === k);
    if (currentDef)
      return (
        <Field
          key={currentDef.key as string}
          field={currentDef}
          initialValue={formModel[currentDef.key]}
          onChange={onChange}
        />
      );
  });
}

export function Field<TModel>({
  field,
  initialValue,
  onChange,
}: {
  field: FieldDef<TModel>;
  initialValue: any;
  onChange: (value: any, key: string) => void;
}) {
  const handleChange = (e: ChangeEvent<any>) => {
    !!onChange && onChange(e.target.value, field.key.toString());
  };

  switch (field.type) {
    case FieldTypes.INPUT:
      return <InputField field={field} value={initialValue} onChange={handleChange} />;
    case FieldTypes.TEXTAREA:
      return (
        <TextareaField field={field} value={initialValue} onChange={handleChange} />
      );
  }
}
