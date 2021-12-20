import "./App.css";
import React from "react";
import "./logo192.png";

function App() {
  return (
    <div className="app">
      <Calculator />
      <Footer />
    </div>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: "0",
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleButtonClick(renoProblem) {
    this.setState({
      problem: renoProblem,
    });
  }
  render() {
    return (
      <div id="calculator">
        <Display problem={this.state.problem} />
        <ButtonPad
          onClick={this.handleButtonClick}
          problem={this.state.problem}
        />
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return <p id="display">{this.props.problem}</p>;
  }
}

class ButtonPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.makePad = this.makePad.bind(this);
  }
  handleClick(event) {
    let value = event.target.value;
    let problem = this.props.problem.toString();
    let last3 = problem.slice(-3);
    let last1 = problem.slice(-1);

    switch (value) {
      case "C":
        problem = "0";
        break;
      case " = ":
        if (/\d$/.test(problem)) {
          problem = +eval(problem).toFixed(5);
        }
        break;
      case ".":
        if (!problem.split(" ").slice(-1)[0].includes(".")) {
          problem += value;
        }
        break;
      case plus:
      case times:
      case dvdBy:
        if (
          last3 === plus ||
          last3 === minus ||
          last3 === times ||
          last3 === dvdBy
        ) {
          problem = problem.slice(0, -3) + value;
        } else if (last1 === negative && problem !== negative) {
          problem = problem.slice(0, -4) + value;
        } else if (problem && problem !== negative) {
          problem += value;
        }
        break;
      case minus:
        if (
          !problem ||
          last3 === plus ||
          last3 === minus ||
          last3 === times ||
          last3 === dvdBy
        ) {
          problem += negative;
        } else if (last1 === negative && problem !== negative) {
          problem = problem.slice(0, -4) + value;
        } else if (last1 !== negative) {
          problem += value;
        }
        break;
      default:
        if (
          problem === "0" ||
          problem.endsWith(" 0") ||
          problem.endsWith("-0")
        ) {
          problem = problem.slice(0, -1) + value;
        } else {
          problem += value;
        }
    }

    this.props.onClick(problem);
  }

  makePad() {
    let newArr = BUTTONS.map((calcBtn) => (
      <button
        className={calcBtn.role}
        id={calcBtn.name}
        value={calcBtn.value}
        key={calcBtn.value}
        onClick={this.handleClick}
      >
        {calcBtn.show}
      </button>
    ));
    return newArr;
  }
  render() {
    return <div id="touch-pad">{this.makePad()}</div>;
  }
}

function Footer() {
  return (
    <div id="resource">
      <p>
        Coded by Stephanie Albanese in <a href="https://reactjs.org/">React</a>{" "}
        <img src="./logo192.png" alt="React logo"></img>
      </p>
      <p>
        Challenge by{" "}
        <a href="https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator">
          freeCodeCamp
        </a>{" "}
        Front End Development Libraries certification curriculum
      </p>
      <p>
        Photo by{" "}
        <a href="https://unsplash.com/@dancristianp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Dan-Cristian Pădureț
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/math?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </p>
    </div>
  );
}

const plus = " + ";
const minus = " - ";
const negative = "-";
const times = " * ";
const dvdBy = " / ";

const BUTTONS = [
  {
    name: "clear",
    show: "C",
    value: "C",
    role: "reset",
  },
  {
    name: "equals",
    show: "=",
    value: " = ",
    role: "evaluate",
  },
  {
    name: "one",
    show: 1,
    value: 1,
    role: "operand",
  },
  {
    name: "two",
    show: 2,
    value: 2,
    role: "operand",
  },
  {
    name: "three",
    show: 3,
    value: 3,
    role: "operand",
  },
  {
    name: "add",
    show: "+",
    value: plus,
    role: "operator",
  },
  {
    name: "four",
    show: 4,
    value: 4,
    role: "operand",
  },
  {
    name: "five",
    show: 5,
    value: 5,
    role: "operand",
  },
  {
    name: "six",
    show: 6,
    value: 6,
    role: "operand",
  },
  {
    name: "subtract",
    show: "\u2212",
    value: minus,
    role: "operator",
  },
  {
    name: "seven",
    show: 7,
    value: 7,
    role: "operand",
  },
  {
    name: "eight",
    show: 8,
    value: 8,
    role: "operand",
  },
  {
    name: "nine",
    show: 9,
    value: 9,
    role: "operand",
  },
  {
    name: "multiply",
    show: "\u00D7",
    value: times,
    role: "operator",
  },
  {
    name: "zero",
    show: 0,
    value: 0,
    role: "operand",
  },
  {
    name: "decimal",
    show: ".",
    value: ".",
    role: "operand",
  },
  {
    name: "divide",
    show: "\u00F7",
    value: dvdBy,
    role: "operator",
  },
];

export default App;
