import {forwardRef} from 'react';

const Input = forwardRef(({register, ...props}: any, ref) => {   
  return (
    <input {...props} ref={ref} />
  );
})

export default Input;
