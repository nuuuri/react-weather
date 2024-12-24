import { ComponentProps } from 'react';
import { IoSearch } from 'react-icons/io5';

export default function Input({ value, onChange }: ComponentProps<'input'>) {
  return (
    <div className="relative w-full">
      <IoSearch className="absolute top-2 left-1" />
      <input
        className="w-full h-8 pl-6 outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
