import React, { useState } from 'react';

function Calculator() {
  const [formula, setFormula] = useState([]); // Array to store formula elements
  const [display, setDisplay] = useState('0'); // Displayed value on the calculator
  const [lastClicked, setLastClicked] = useState(null); // Track the last button clicked

  // Function to handle button clicks
  const handleClick = (value) => {
    switch (value) {
      case 'AC':
        clearDisplay();
        break;
      case '=':
        evaluateFormula();
        break;
      case '.':
        handleDecimal();
        break;
      default:
        handleInput(value);
        break;
    }
  };

  // Function to handle digit and operator clicks
  const handleInput = (input) => {
    if (input === '0' && display === '0') {
      return; // Prevent multiple leading zeros
    }

    // Handle consecutive operators excluding negative sign (-)
    if (['+', '*', '/'].includes(input)) {
      if (lastClicked === '-' && formula.length > 0 && !formula.includes('+') && !formula.includes('*') && !formula.includes('/')) {
        // Handle negative sign case
        setFormula([...formula, input]);
      } else if (lastClicked && ['+', '-', '*', '/'].includes(lastClicked)) {
        // Replace the last operator in formula with the new input
        const newFormula = [...formula];
        newFormula.pop(); // Remove the last operator
        newFormula.push(input); // Add the new operator
        setFormula(newFormula);
      } else {
        // Append input to formula
        setFormula([...formula, input]);
      }
    } else {
      if (lastClicked === '=') {
        // Start a new calculation after '='
        clearDisplay();
      } else {
        // Append input to display and formula
        setDisplay(display === '0' ? input : display + input);
        setFormula([...formula, input]);
      }
    }

    setLastClicked(input);
  };


  // Function to handle decimal point
  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setFormula([...formula, '.']);
      setLastClicked('.');
    }
  };

  // Function to clear display and formula
  const clearDisplay = () => {
    setDisplay('0');
    setFormula(['']);
    setLastClicked(null);
  };

  // Function to evaluate the formula
  const evaluateFormula = () => {
    try {
      const result = eval(formula.join(''));
      setDisplay(result.toString());
      setFormula([...formula, ` = ${result.toString()}`]);
      setLastClicked('=');
    } catch (error) {
      setDisplay('Please Click AC and Input New Formula');
      setFormula([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
           <div className='bg-black p-1'>
      {/* Formula bar */}
      <div className="bg-black w-80 text-white font-mono py-2 px-6 text-right">
        {formula.join('')}
      </div>

      {/* Answer bar */}
      <div className="bg-black w-80 text-white font-mono py-2 px-6 text-right">
        {display}
      </div>

      {/* Calculator buttons */}
      <div className="grid grid-cols-4 gap-0 w-80">
        {/* Row 1 */}
        <button 
        className="bg-red-900 font-mono border text-white border-black items-center justify-center text-2xl font-semibold w-full h-20  col-span-2" onClick={() => handleClick('AC')}>
          AC
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('/')}>
          /
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('*')}>
          *
        </button>

        {/* Row 2 */}
        <button className="calc-button h-20" onClick={() => handleClick('7')}>
          7
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('8')}>
          8
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('9')}>
          9
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('-')}>
          -
        </button>

        {/* Row 3 */}
        <button className="calc-button h-20" onClick={() => handleClick('4')}>
          4
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('5')}>
          5
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('6')}>
          6
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('+')}>
          +
        </button>

        {/* Row 4 */}
        <button className="calc-button h-20" onClick={() => handleClick('1')}>
          1
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('2')}>
          2
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('3')}>
          3
        </button>
        <button className="bg-blue-800 font-mono border text-white border-black items-center justify-center text-2xl font-semibold w-full row-span-2" onClick={() => handleClick('=')}>
          =
        </button>

        {/* Row 5 */}
        <button className="calc-button h-20 col-span-2" onClick={() => handleClick('0')}>
          0
        </button>
        <button className="calc-button h-20" onClick={() => handleClick('.')}>
          .
        </button>
      </div>
      </div>
      <p className='text-md mt-3 text-black font-serif'>Coded and Designed by</p>
      <p className='text-md text-black font-semibold font-serif'>Anum</p>
    </div>
  );
}

export default Calculator;
