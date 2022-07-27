import { forwardRef } from "react";

export const Radio = ({ children, inputValue, register, ...props }: any) => {
  return (
    <label style={{ display: 'block', margin: '4px' }}>
      <input
        type="radio"
        {...register('field')}
        value={inputValue}
        {...props}
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
          inputValue={value}
          register={register}
          data-testid={`radio-${value}-${text}`}
        >
          {text}
        </Radio>
      )}
    </>
  );
})