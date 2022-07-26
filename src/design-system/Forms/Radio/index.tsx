import { forwardRef } from "react";

export const Radio = ({ children, inputValue, register, ref }: any) => {
  return (
    <label style={{ display: 'block', margin: '4px' }}>
      <input
        type="radio"
        {...register('field')}
        value={inputValue}
      />
      {children}
    </label>
  );
}

export const RadioGroup = forwardRef(({ register, options }: any, ref) => {
  return (
    <>
      {options?.map((
        { value, text }: 
        {
          value: string | number | boolean,
          text: string,
        }) => 
        <Radio
          key={`${value}-${text}`}
          innerRef={ref}
          inputValue={value}
          register={register}
        >
          {text}
        </Radio>
      )}
    </>
  );
})