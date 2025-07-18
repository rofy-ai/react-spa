import { Calculator } from "@/components/Calculator";
import { CalculatorButton } from "@/components/CalculatorButton";
import { useEffect, useState } from "react";

const calculatorFile = `
import { useState } from 'react';
import { CalculatorButton } from './CalculatorButton';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (firstOperand: number, secondOperand: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return secondOperand !== 0 ? firstOperand / secondOperand : 0;
      default:
        return secondOperand;
    }
  };

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const formatDisplay = (value: string) => {
    if (value.length > 12) {
      const num = parseFloat(value);
      if (num > 999999999999) {
        return num.toExponential(6);
      }
      return num.toPrecision(12);
    }
    return value;
  };

  return (
    <div className="glass-surface p-8 rounded-[2rem] max-w-sm mx-auto">
      {/* Display */}
      <div className="glass-display p-6 mb-6 text-right min-h-[80px] flex items-center justify-end">
        <div className="text-4xl font-light tracking-wider">
          {formatDisplay(display)}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Row 1 */}
        <CalculatorButton
          onClick={clear}
          variant="clear"
          className="col-span-2"
        >
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </CalculatorButton>
        <CalculatorButton
          onClick={() => performOperation('÷')}
          variant="operator"
        >
          ÷
        </CalculatorButton>
        <CalculatorButton
          onClick={() => performOperation('×')}
          variant="operator"
        >
          ×
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => inputNumber('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('9')}>9</CalculatorButton>
        <CalculatorButton
          onClick={() => performOperation('-')}
          variant="operator"
        >
          −
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => inputNumber('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('6')}>6</CalculatorButton>
        <CalculatorButton
          onClick={() => performOperation('+')}
          variant="operator"
        >
          +
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputNumber('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('3')}>3</CalculatorButton>
        <CalculatorButton
          onClick={performEquals}
          variant="equals"
          className="row-span-2"
        >
          =
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton
          onClick={() => inputNumber('0')}
          className="col-span-2"
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
      </div>
    </div>
  );
};
`;


export default function Home() {
  const [data, setData] = useState<{ message: string; timestamp: string } | null>(null);
  const fetchHello = async () => {
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const update = async () => {
    try {
      const response = await fetch("/api/updateFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filePath: "client/src/components/Calculator.tsx",
          content: calculatorFile,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update file");
      }

      const result = await response.json();
      console.log("File updated successfully:", result);
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  useEffect(() => {
    fetchHello();
  }, []);

  return (
   <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-light mb-4 text-foreground">
            Hello bro
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            Beautiful calculator with glass morphism design
          </p>
          <CalculatorButton
                    onClick={update}
                    variant="clear"
                    className="col-span-2"
                  >
                    Click me to update file via API
                  </CalculatorButton >
        </div>
        
        <Calculator />
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Designed with modern glass UI aesthetics</p>
        </div>
      </div>
    </div>
  );
}
