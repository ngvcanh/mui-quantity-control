import {
  ChangeEvent,
  forwardRef,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { styled, SxProps, Theme } from '@mui/system';
import Input, { inputClasses, InputProps } from "@mui/material/Input";
import Button, { ButtonProps } from "@mui/material/Button";
import InputNumber, { InputNumberProps } from '@kensoni/react-input-number';
import clsx from 'clsx';

export interface QuantityControlRef extends HTMLInputElement{}

export interface QuantityControlProps extends Omit<InputNumberProps, 'onChange'>{
  value?: number;
  onClickMinus?(e: MouseEvent<HTMLButtonElement>, value: number): void;
  onClickPlus?(e: MouseEvent<HTMLButtonElement>, value: number): void;
  onChange?(e: SyntheticEvent<HTMLElement>, value: number): void;
  sx?: SxProps<Theme>;
  minusIcon?: ReactNode;
  plusIcon?: ReactNode;
  InputProps?: Omit<InputProps, keyof InputNumberProps>;
  ButtonProps?: {
    minus?: ButtonProps;
    plus?: ButtonProps;
  }
}

export const quantityControlClassName = 'MuiQuantityControl';

const makeClass = (className: string) => clsx(quantityControlClassName, className).replace(' ', '-');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

export const quantityControlClasses = {
  root: makeClass('root'),
  buttonMinus: makeClass('buttonMinus'),
  buttonPlus: makeClass('buttonPlus'),
  input: makeClass('input')
}

const StyledInput = styled(Input)(() => ({
  [`.${ inputClasses.input }`]: {
    textAlign: 'center'
  }
}));

const QuantityControl = forwardRef<QuantityControlRef, QuantityControlProps>(
  function QuantityControl(props, ref){

    const { 
      value, 
      InputProps = {}, 
      ButtonProps = {},
      onClickPlus,
      onClickMinus, 
      onChange,
      className, 
      sx,
      minusIcon = '-',
      plusIcon = '+',
      ...rest
    } = props;

    const inputNumberRef = useRef<HTMLInputElement>(null);

    const [ currentValue, setCurrentValue ] = useState(value);

    useEffect(() => {
      value === currentValue || setCurrentValue(value);
    }, [ value ]);

    useEffect(() => {
      if (ref){
        if (typeof ref === 'function'){
          ref(inputNumberRef.current);
        }
        else{
          (ref as MutableRefObject<HTMLInputElement>).current = inputNumberRef.current!;
        }
      }
    }, []);

    const _onClickMinus = (e: MouseEvent<HTMLButtonElement>) => {
      if (!currentValue) return;

      const newValue = (currentValue ?? 0) - 1;
      setCurrentValue(newValue);

      onClickMinus?.(e, newValue);
      e.defaultPrevented || onChange?.(e, newValue);
    }

    const _onClickPlus = (e: MouseEvent<HTMLButtonElement>) => {
      const newValue = (currentValue ?? 0) + 1;
      setCurrentValue(newValue);

      onClickPlus?.(e, newValue);
      e.defaultPrevented || onChange?.(e, newValue);
    }

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = +e.target.value;
      setCurrentValue(newValue);
      onChange?.(e, newValue);
    }

    const { minus: minusProps = {}, plus: plusProps = {} } = ButtonProps;

    return <InputNumber
      { ...rest }
      ref={ inputNumberRef }
      disableNegative
      integer
      value={ currentValue }
      onChange={ _onChange }
      renderInput={(inputProps, inputRef) => (
        <StyledInput
          { ...InputProps }
          className={ clsx(quantityControlClasses.root, className) }
          sx={ sx }
          inputProps={{
            ...inputProps,
            className: quantityControlClasses.input
          }}
          inputRef={ inputRef }
          startAdornment={
            <Button
              { ...minusProps }
              className={ clsx(quantityControlClasses.buttonMinus, minusProps.className) }
              onClick={ _onClickMinus }
            >
              { minusIcon }
            </Button>
          }
          endAdornment={
            <Button
              { ...plusProps }
              className={ clsx(quantityControlClasses.buttonPlus, plusProps.className) }
              onClick={ _onClickPlus }
            >
              { plusIcon }
            </Button>
          }
        />
      )}
    />
  }
);

export default QuantityControl;