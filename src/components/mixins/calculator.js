
import Decimal from "decimal.js";
import { disable_btn_list, buttons, keyPressButtonList } from "./variables.js";
export default {
  data() {
    return {
      display: "0",
      upperDisplay: "",
      currentValue: "0",
      previousValue: "",
      operator: "",
      setDisplay: false,
      disable_btn: false,
      setDiplayAfterEqual: false,
      triggerUpperFunc: false,
      removeDisplayValue: false,
      disable_btn_list,
      buttons,
    };
  },
  computed: {
    displayFormated(){
        const [integer, decimal] = this.display.split('.');
        const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;
    },
    history(){
      return this.$store.getters.history;
    }
  },
  methods: {
    handleKeyPress(event) {
      if (keyPressButtonList.find((val) => val === event.key)) {
        if (event.key === "/") this.input("÷");
        else if (event.key === "*") this.input("×");
        else if (event.key === "-") this.input("−");
        else this.input(event.key);
      } else if (event.key === "Enter") this.input("=");
      else if (event.key === "Escape") this.input("C");
      else if (event.key === "Backspace") this.input("⌫");
      else {
      }
    },
    historyItemClick(ind) {
      this.upperDisplay = this.history[ind].expression;
      this.display = this.history[ind].result;
      this.currentValue = this.history[ind].currentValue;
      this.previousValue = this.history[ind].result;
      this.operator = this.history[ind].operator;
    },
    input(value) {
      if (this.display.includes(".") && value === ".") {
      } else if (!isNaN(value) || value === ".") {
        this.handleNumber(value);
      } else if (value === "C") {
        this.clearAll();
      } else if (value === "CE") {
        this.clearEntry();
      } else if (value === "⌫") {
        this.handleBackspace();
      } else if (value === "=") {
        this.calculate();
      } else if (value === "%") {
        this.handlePercentage();
      } else if (value === "⅟x") {
        this.handleReciprocal();
      } else if (value === "x²") {
        this.handleSquare();
      } else if (value === "²√x") {
        this.handleSquareRoot();
      } else if (value === "+/-") {
        this.toggleSign();
      } else {
        this.handleOperator(value);
      }
    },
    handleNumber(value) {
      if (this.setDisplay || this.setDiplayAfterEqual) this.clearAll();
      if (this.removeDisplayValue) this.clearEntry();
      if (this.display.length > 16) {
      } else if (this.display === "0" && value !== ".") {
        this.display = value;
      } else {
        this.display += value;
      }
      this.currentValue = this.display;
    },
    handleBackspace() {
      if (this.setDisplay || this.setDiplayAfterEqual) this.clearAll();
      else if (this.removeDisplayValue) this.clearEntry();
      else {
        this.display = this.display.slice(0, -1) || "0";
        this.currentValue = this.display;
      }
    },
    handlePercentage() {
      if (this.operator === "÷" || this.operator === "×") {
        this.display = String(new Decimal(this.display).divToInt(100));
        this.upperDisplay =
          this.previousValue + " " + this.operator + " " + this.display;
      } else if (this.operator === "+" || this.operator === "−") {
        this.display = String(
          new Decimal(this.display).mul(new Decimal(this.previousValue + "0")).divToInt(100))
            
        this.upperDisplay =
          this.previousValue + " " + this.operator + " " + this.display;
      } else {
        this.display = "0";
        this.upperDisplay = this.display;
      }
      this.currentValue = this.display;
    },
    handleReciprocal() {
      this.upperDisplay = `${this.previousValue} ${
        this.operator
      } 1 / (${new Decimal(this.display)})`;
      if (this.display === "0") {
        this.display = "Cannot divide by zero";
        this.disable_btn = true;
        this.setDisplay = true;
      } else {
        this.display = String(1 / new Decimal(this.display).toNumber());
        this.currentValue = this.display;
        this.triggerUpperFunc = true;
      }
    },
    handleSquare() {
      this.upperDisplay = `${this.previousValue} ${this.operator} sqr(${this.display})`;
      this.display = String(Math.pow(new Decimal(this.display).toNumber(), 2));
      this.currentValue = this.display;
      if (this.display === "Infinity") {
        this.display = "Overflow";
        this.setDisplay = true;
        this.disable_btn = true;
      } else {
        this.triggerUpperFunc = true;
      }
    },
    handleSquareRoot() {
      this.upperDisplay = `${this.previousValue} ${this.operator} √(${this.display})`;
      this.display = String(Math.sqrt(new Decimal(this.display).toNumber()));
      this.currentValue = this.display;
      if (this.display === "NaN") {
        this.display = "Invalid Input";
        this.setDisplay = true;
        this.disable_btn = true;
      } else {
        this.triggerUpperFunc = true;
      }
    },
    toggleSign() {
      this.display = String(new Decimal(this.display).mul(-1));
      this.currentValue = this.display;
    },
    handleOperator(operator) {
      if (this.currentValue) {
        if (
          this.previousValue &&
          this.operator &&
          !this.setDiplayAfterEqual &&
          !this.removeDisplayValue
        ) {
          this.calculate();
        }
        this.operator = operator;
        this.previousValue = String(new Decimal(this.display));
        this.removeDisplayValue = true;
      }
      this.operator = operator;
      this.upperDisplay = this.previousValue + " " + this.operator;
      this.setDiplayAfterEqual = false;
    },
    calculate() {
      if (this.previousValue && this.operator && this.currentValue) {
        if (this.disable_btn) return this.clearAll();
        const prev = new Decimal(this.previousValue);
        const current = new Decimal(this.currentValue);
        let result = 0;
        switch (this.operator) {
          case "+":
            result = prev.plus(current);
            break;
          case "−":
            result = prev.minus(current);
            break;
          case "×":
            result = prev.mul(current);
            break;
          case "÷":
            result = prev.dividedBy(current);
            break;
        }
        this.upperDisplay = prev + " " + this.operator + " " + current + " =";
        if (String(result) === "NaN") {
          this.display = "Result is undefined";
          this.setDisplay = true;
          this.disable_btn = true;
        } else if (String(result) === "Infinity") {
          if (this.operator == "÷") this.display = "Cannot divide by zero";
          else this.display = "Overflow";
          this.setDisplay = true;
          this.disable_btn = true;
        } else {
          this.display = String(result);
          const historyEntry = {
            expression: `${prev} ${this.operator} ${current} =`,
            result: `${result}`,
            operator: this.operator,
            currentValue: current,
          };
          this.$store.dispatch('addHistory', { historyEntry })
        }
        this.setDiplayAfterEqual = true;
        this.previousValue = String(result);
      } else if (this.triggerUpperFunc) {
        if (this.disable_btn) return this.clearAll();
        this.upperDisplay = `${this.upperDisplay} =`;
        let result = new Decimal(this.display);
        result = result.toString();
        const historyEntry = {
          expression: `${this.upperDisplay}`,
          result: `${result}`,
          operator: this.operator,
          currentValue: this.currentValue,
        };
        this.$store.dispatch('addHistory', { historyEntry })
        this.triggerUpperFunc = false;
        this.setDiplayAfterEqual = true;
        this.display = `${result}`;
      } else {
        if (this.disable_btn) return this.clearAll();
        let result = new Decimal(this.display);
        result = result.toString();
        // result = BigInt(result.toPrecision(17));
        this.upperDisplay = `${result} =`;
        const historyEntry = {
          expression: `${result} =`,
          result: `${result}`,
          operator: this.operator,
          currentValue: this.currentValue,
        };
        this.$store.dispatch('addHistory', { historyEntry })
        this.display = `${result}`;
      }
    },
    clearAll() {
      if (this.setDisplay) {
        this.disable_btn = false;
        this.setDisplay = false;
      }
      this.display = "0";
      this.currentValue = "0";
      this.previousValue = "";
      this.operator = "";
      this.upperDisplay = "";
      this.setDiplayAfterEqual = false;
    },
    clearEntry() {
      if (this.setDisplay) this.clearAll();
      else {
        this.display = "0";
        this.currentValue = "0";
        if (this.upperDisplay[this.upperDisplay.length - 1] == "=")
          this.upperDisplay = "";
      }
      this.removeDisplayValue = false;
    },
    
  },
};
