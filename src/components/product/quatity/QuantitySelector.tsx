'use client';
import React, { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const [count, setCount] = useState(quantity);
  const onValueChanged = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
    onQuantityChanged(count + value);
  };
  return (
    <div className='flex'>
      <button>
        <IoRemoveCircleOutline size={30} onClick={() => onValueChanged(-1)} />
      </button>
      <span className='w-20 mx-3 px-5 bg-gray-200 text-center rounded'>
        {count}
      </span>
      <button>
        <IoAddCircleOutline size={30} onClick={() => onValueChanged(1)} />
      </button>
    </div>
  );
};
