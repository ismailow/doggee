import { HTMLProps } from 'react';

export interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'placaholder'> {
  label: string;
  isError?: boolean;
  helperText?: string;
}
