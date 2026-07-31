import { useState, useEffect } from 'react';
import { drivers2026 } from '../../data/drivers2026';
import './CalculatorApp.css';

export default function CalculatorApp({ team }) {
  const [currentVal, setCurrentVal] = useState('0');
  const [prevVal, setPrevVal] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [easterEgg, setEasterEgg] = useState(null);

  const handleDigit = (digit) => {
    if (waitingForNewValue) {
      setCurrentVal(digit);
      setWaitingForNewValue(false);
    } else {
      setCurrentVal(currentVal === '0' ? digit : currentVal + digit);
    }
  };

  const handleDot = () => {
    if (waitingForNewValue) {
      setCurrentVal('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!currentVal.includes('.')) {
      setCurrentVal(currentVal + '.');
    }
  };

  const handleClear = () => {
    setCurrentVal('0');
    setPrevVal(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (waitingForNewValue) return;
    setCurrentVal(currentVal.length > 1 ? currentVal.slice(0, -1) : '0');
  };

  const handleToggleSign = () => {
    setCurrentVal((parseFloat(currentVal) * -1).toString());
  };

  const handlePercentage = () => {
    setCurrentVal((parseFloat(currentVal) / 100).toString());
  };

  const performCalculation = (op, a, b) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return String(numB || 0);

    let result = 0;
    switch (op) {
      case '+': result = numA + numB; break;
      case '-': result = numA - numB; break;
      case '×': result = numA * numB; break;
      case '÷': result = numB === 0 ? 'Error' : numA / numB; break;
      default: return String(numB);
    }
    
    // Prevent ultra-long decimals
    if (result.toString().length > 12 && !result.toString().includes('e')) {
      return result.toFixed(8).replace(/\.?0+$/, '');
    }
    return String(result);
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentVal);
    
    if (prevVal == null) {
      setPrevVal(currentVal);
    } else if (operator) {
      const currentValue = prevVal || 0;
      const newValue = performCalculation(operator, currentValue, currentVal);
      setCurrentVal(String(newValue));
      setPrevVal(String(newValue));
    }
    
    setWaitingForNewValue(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (!operator || prevVal == null) {
      // Check for easter egg even if no operator (e.g. user typed 44 and hit =)
      checkForEasterEgg(currentVal);
      return;
    }

    const newValue = performCalculation(operator, prevVal, currentVal);
    setCurrentVal(String(newValue));
    setPrevVal(null);
    setOperator(null);
    setWaitingForNewValue(true);
    
    checkForEasterEgg(currentVal); // check what user inputted right before equals
  };

  const checkForEasterEgg = (value) => {
    // If it's a valid driver number in 2026
    const driver = drivers2026[value];
    if (driver) {
      setEasterEgg({ number: value, ...driver });
      
      // Auto dismiss after 3 seconds
      setTimeout(() => {
        setEasterEgg(null);
      }, 3000);
    }
  };

  return (
    <div className="calc-app" style={{ '--accent-color': team?.accent || '#ff4d4d' }}>
      <div className="calc-display-container">
        <div className="calc-prev-value">
          {prevVal} {operator}
        </div>
        <div className="calc-current-value">
          {currentVal}
        </div>
      </div>
      
      <div className="calc-keypad">
        <button className="calc-btn operator secondary" onClick={handleClear}>C</button>
        <button className="calc-btn operator secondary" onClick={handleToggleSign}>±</button>
        <button className="calc-btn operator secondary" onClick={handlePercentage}>%</button>
        <button className="calc-btn operator" onClick={() => handleOperator('÷')}>÷</button>
        
        <button className="calc-btn" onClick={() => handleDigit('7')}>7</button>
        <button className="calc-btn" onClick={() => handleDigit('8')}>8</button>
        <button className="calc-btn" onClick={() => handleDigit('9')}>9</button>
        <button className="calc-btn operator" onClick={() => handleOperator('×')}>×</button>
        
        <button className="calc-btn" onClick={() => handleDigit('4')}>4</button>
        <button className="calc-btn" onClick={() => handleDigit('5')}>5</button>
        <button className="calc-btn" onClick={() => handleDigit('6')}>6</button>
        <button className="calc-btn operator" onClick={() => handleOperator('-')}>-</button>
        
        <button className="calc-btn" onClick={() => handleDigit('1')}>1</button>
        <button className="calc-btn" onClick={() => handleDigit('2')}>2</button>
        <button className="calc-btn" onClick={() => handleDigit('3')}>3</button>
        <button className="calc-btn operator" onClick={() => handleOperator('+')}>+</button>
        
        <button className="calc-btn zero" onClick={() => handleDigit('0')}>0</button>
        <button className="calc-btn" onClick={handleDot}>.</button>
        <button className="calc-btn equals" onClick={handleEquals}>=</button>
      </div>

      {/* Easter Egg Overlay */}
      <div 
        className={`calc-easter-egg ${easterEgg ? 'show' : ''}`}
        style={{ borderColor: easterEgg?.color || '#fff' }}
      >
        <div className="easter-egg-header">2026 Driver Profile</div>
        <div className="easter-egg-number" style={{ color: easterEgg?.color || '#fff' }}>
          #{easterEgg?.number}
        </div>
        <div className="easter-egg-name">{easterEgg?.name}</div>
        <div className="easter-egg-team">{easterEgg?.team}</div>
      </div>
    </div>
  );
}
