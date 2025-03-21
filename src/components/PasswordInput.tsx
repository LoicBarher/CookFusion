"use client";

import { useState } from "react";
import Image from "next/image";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Votre mot de passe",
  label,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="border p-2 rounded w-full pr-10 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-xs"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 pr-2 flex items-center"
        >
          <Image
            src={
              show
                ? "/images/svg/password-eyes-on.svg"
                : "/images/svg/password-eyes-off.svg"
            }
            alt="Afficher/Cacher"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}
