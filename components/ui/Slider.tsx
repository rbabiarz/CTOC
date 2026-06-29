'use client';

import type { InputHTMLAttributes } from 'react';

/* ===== Slider — native range input (keyboard-accessible) with optional label/value ===== */
interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
}

export function Slider({ label, showValue, className, value, id, ...rest }: SliderProps) {
  return (
    <div className="slider">
      {(label || showValue) && (
        <div className="slider__head">
          {label && <label className="slider__label" htmlFor={id}>{label}</label>}
          {showValue && <span className="slider__value">{value}</span>}
        </div>
      )}
      <input
        type="range"
        id={id}
        className={`slider__range ${className || ''}`.trim()}
        value={value}
        {...rest}
      />
    </div>
  );
}
