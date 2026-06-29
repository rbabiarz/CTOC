'use client';

import type {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';

/* ===== Field — label + control + hint/error wrapper ===== */
interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, hint, error, htmlFor, children, className }: FieldProps) {
  return (
    <div className={`field ${className || ''}`.trim()}>
      {label && <label className="field__label" htmlFor={htmlFor}>{label}</label>}
      {children}
      {error ? (
        <span className="field__error" role="alert">{error}</span>
      ) : hint ? (
        <span className="field__hint">{hint}</span>
      ) : null}
    </div>
  );
}

/* ===== Input ===== */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ invalid, className, ...rest }: InputProps) {
  return (
    <input
      className={`input ${invalid ? 'input--invalid' : ''} ${className || ''}`.trim()}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}

/* ===== Textarea ===== */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ invalid, className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={`input textarea ${invalid ? 'input--invalid' : ''} ${className || ''}`.trim()}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}

/* ===== Select (native) ===== */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export function Select({ children, className, ...rest }: SelectProps) {
  return (
    <span className="select">
      <select className={`select__el ${className || ''}`.trim()} {...rest}>
        {children}
      </select>
      <span className="select__chev" aria-hidden="true">▾</span>
    </span>
  );
}

/* ===== Checkbox ===== */
interface ChoiceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export function Checkbox({ label, className, ...rest }: ChoiceProps) {
  return (
    <label className={`choice ${className || ''}`.trim()}>
      <input type="checkbox" className="choice__cb" {...rest} />
      {label && <span className="choice__label">{label}</span>}
    </label>
  );
}

/* ===== Radio ===== */
export function Radio({ label, className, ...rest }: ChoiceProps) {
  return (
    <label className={`choice ${className || ''}`.trim()}>
      <input type="radio" className="choice__cb choice__cb--radio" {...rest} />
      {label && <span className="choice__label">{label}</span>}
    </label>
  );
}

/* ===== Switch ===== */
export function Switch({ label, className, ...rest }: ChoiceProps) {
  return (
    <label className={`switch ${className || ''}`.trim()}>
      <input type="checkbox" role="switch" className="switch__cb" {...rest} />
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
}
