import React from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <Check size={14} color="#1A0F00" />
      <span>{message}</span>
    </div>
  );
}
