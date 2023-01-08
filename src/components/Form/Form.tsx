import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  ticker: yup.string().required(),
  period: yup.number().required(),
}).required();

export const Form = (): React.ReactElement => {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* // TODO add select field(s) */}
      <input type="submit" />
    </form>
  );
}