import React, { useState } from "react";
import Buttons from "./Buttons";
import History from "./History";
import Display from "./Display";
import * as Calculator from "./utils";
import "./App.css";

const App = () => {
  const [formula, setFormula] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("0");
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [afterCalculation, setAfterCalculation] = useState(false);
  const [historyLength, setHistoryLength] = useState(1);

  const onDigit = ({ target }) => {
    const digit = target.innerText;

    if (afterCalculation) {
      setInput(digit);
      setAfterCalculation(false);
    } else if (input === "0") {
      setInput(digit);
    } else if (Calculator.isNotNumber(input)) {
      setInput(digit);
      setFormula(formula.concat(input));
    } else {
      setInput(input.concat(digit));
    }
  };

  const onDecimal = ({ target }) => {
    const decimal = target.innerText;

    if (afterCalculation) {
      setInput(`0${decimal}`);
      setAfterCalculation(false);
    } else if (Calculator.isNotNumber(input)) {
      setInput(`0${decimal}`);
      setFormula(formula.concat(input));
    } else if (!input.includes(decimal)) {
      setInput(input.concat(decimal));
    }
  };

  const onOperator = ({ target }) => {
    const operator = target.innerText;

    if (Calculator.isOperator(input)) {
      setInput(operator);
      setAfterCalculation(false);
    } else {
      setFormula(formula.concat(input));
      setInput(operator);
      setAfterCalculation(false);
    }
  };

  //allClear to completely clear the history
  const onAllClear = () => {
    setFormula([]);
    setInput("0");
    setAfterCalculation(false);
    setHistory([]);
  };

  //clear traverse the history list till it reaches the end of history.
  const onClear = () => {
    setFormula([]);
    if (input !=="0" && history.length && history.length >= historyLength && history[historyLength]) {
      setInput(history[historyLength]?.result);
      setHistoryLength(historyLength + 1);
    } else {
      setInput("0");
      setHistoryLength(1);
    }
    setAfterCalculation(false);
  };

  const onSquareRoot = () => {
    if (Calculator.isNumber(input)) {
      setInput(Math.sqrt(input));
      setAfterCalculation(true);
    }
  };

  const onSquare = () => {
    if (Calculator.isNumber(input)) {
      setInput(input * input);
      setAfterCalculation(true);
    }
  };

  const onPlusOrMinus = () => {
    if (Calculator.isNumber(input)) {
      if (input.includes("+")) {
        setInput(input.replace("+", "-"));
      } else if (input.includes("-")) {
        setInput(input.replace("-", "+"));
      } else {
        setInput(`+${input}`);
      }
      setAfterCalculation(true);
    }
  };

  const onBackspace = () => {
    const currentInputLength = input.length;

    if (input === "Infinity" || input === "-Infinity" || input === "NaN") {
      setInput("0");
      setAfterCalculation(false);
    } else if (currentInputLength > 1) {
      setInput(input.slice(0, currentInputLength - 1));
      setAfterCalculation(false);
    } else if (input !== "0") {
      setInput("0");
      setAfterCalculation(false);
    } else if (formula.length > 0) {
      setInput(formula[formula.length - 1]);
      setFormula(formula.slice(0, formula.length - 1));
      setAfterCalculation(false);
    }
  };

  const onEqual = () => {
    const finalFormula = formula.concat(input);
    const result = Calculator.evaluate(finalFormula);

    if (!Number.isNaN(result)) {
      const newHistoryItem = {
        formula: finalFormula,
        result: result,
      };

      setInput(result + "");
      setFormula([]);
      setHistory([].concat(newHistoryItem, history));
      setAfterCalculation(true);
    }
  };

  const onHistory = () => {
    setIsShowHistory(!isShowHistory);
  };

  const onClearHistory = () => {
    setHistory([]);
  };

  const onHistoryItemClicked = ({ target }) => {
    const number = target.getAttribute("value");

    if (Calculator.isNumber(input)) {
      setInput(number);
    } else {
      setInput(number);
      setFormula(formula.concat(input));
    }
  };

  return (
    <div>
      <div className="calculator">
        <Display
          formula={formula}
          input={input}
          onBackspace={onBackspace}
          onHistory={onHistory}
          isShowHistory={isShowHistory}
        />

        <Buttons
          onClear={onClear}
          onAllClear={onAllClear}
          onEqual={onEqual}
          onDecimal={onDecimal}
          onDigit={onDigit}
          onOperator={onOperator}
          onSquareRoot={onSquareRoot}
          onSquare={onSquare}
          onPlusOrMinus={onPlusOrMinus}
        />

        <History
          isShowHistory={isShowHistory}
          history={history}
          onHistoryItemClicked={onHistoryItemClicked}
          onEqual={onEqual}
          onClearHistory={onClearHistory}
        />
      </div>
    </div>
  );
};

export default App;
