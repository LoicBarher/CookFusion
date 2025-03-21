"use client";

import { useEffect, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function EmailInput({
  value,
  onChange,
  placeholder = "Votre adresse e-mail",
  label = "Email",
}: EmailInputProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!value) {
      setIsValid(null);
    } else {
      setIsValid(EMAIL_REGEX.test(value));
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}{" "}
        {isValid === true && <span className="text-green-500">✅</span>}
        {isValid === false && <span className="text-red-500">❌</span>}
      </label>
      <input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-xs"
      />
    </div>
  );
}
