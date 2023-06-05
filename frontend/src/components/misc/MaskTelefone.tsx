import React, { useState } from 'react';

interface MaskTelefoneProps {
  disabled: boolean;
  value?: string; // Adicionando a propriedade value opcional de tipo string
}

const MaskTelefone = ({ disabled, value }: MaskTelefoneProps) => {
  const [phone, setPhone] = useState(value || '');

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedPhone = formatPhone(value);
    setPhone(formattedPhone);
  };

  const formatPhone = (phone: string) => {
    const cleanedPhone = phone.replace(/[^\d]/g, '');
    const match = cleanedPhone.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return cleanedPhone;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="(00) 00000-0000"
        value={phone}
        onChange={handlePhoneChange}
        className="form-control"
        maxLength={11}
        disabled={disabled}
      />
    </div>
  );
};

export default MaskTelefone;