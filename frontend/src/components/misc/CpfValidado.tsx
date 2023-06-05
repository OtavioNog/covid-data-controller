import React, { useState } from 'react';

interface ValidationCPFProps {
  disabled: boolean;
  value?: string;
  validacao: boolean;
}

const CpfValidado = ({ disabled, value, validacao }: ValidationCPFProps) => {
  const [cpf, setCPF] = useState(value || '');
  const [valid, setValid] = useState(validacao);

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCPF = formatCPF(value);
    setCPF(formattedCPF);
    setValid(validateCPF(value));
  };

  const formatCPF = (cpf: string) => {
    const cleanedCPF = cpf.replace(/[^\d]/g, '');
    const match = cleanedCPF.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cleanedCPF;
  };

  const validateCPF = (cpf: string) => {
    const cleanedCPF = cpf.replace(/[^\d]/g, '');
  
    if (cleanedCPF.length !== 11) return false;
  
    const digits = cleanedCPF.split('').map(Number);
  
    if (digits.every((digit) => digit === digits[0])) return false;
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit > 9) firstDigit = 0;
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit > 9) secondDigit = 0;
  
    return (
      firstDigit === digits[9] &&
      secondDigit === digits[10]
    );
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="000.000.000-00"
        value={cpf}
        onChange={handleCPFChange}
        className="form-control"
        maxLength={11}
        disabled={disabled}
      />
      {valid && validacao && cpf.length === 14 ? (
        <span style={{ color: 'green' }}>Este CPF é válido</span>
      ) : null}
      {!valid && validacao ? (
        <span style={{ color: 'red' }}>Este CPF é inválido</span>
      ) : null}
    </div>
  );
};

export default CpfValidado;
