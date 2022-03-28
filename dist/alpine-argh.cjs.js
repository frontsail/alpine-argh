var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// builds/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default
});
module.exports = __toCommonJS(module_exports);

// src/index.js
function src_default(Alpine) {
  Alpine.directive("argh", (el, { value, modifiers, expression }, { effect, evaluate }) => {
    if (!value) {
      return;
    }
    let { argObj, argName, deep } = resolve(el._x_dataStack, expression);
    const propObj = el._x_dataStack[0];
    const propName = camelize(value);
    const bind = argObj && modifiers.includes("bind");
    let prevPropValue = propObj[propName];
    let prevArgObj = argObj;
    let prevArgValue = void 0;
    effect(() => {
      prevArgObj = argObj;
      deep && ({ argObj, argName, deep } = resolve(el._x_dataStack, expression));
      if (argObj) {
        if (argObj[argName] !== prevArgValue || argObj !== prevArgObj) {
          propObj[propName] = argObj[argName];
        }
        if (bind && propObj[propName] !== prevPropValue) {
          argObj[argName] = propObj[propName];
        }
        prevArgValue = argObj[argName];
        prevPropValue = propObj[propName];
      } else {
        const argValue = evaluate(expression);
        if (argValue !== prevArgValue) {
          propObj[propName] = argValue;
          prevArgValue = argValue;
        }
      }
    });
  });
  function camelize(s) {
    return s.replace(/-./g, (x) => x[1].toUpperCase());
  }
  function resolve(stack, expression) {
    let argObj = null;
    let argName = null;
    let deep = false;
    for (let i = 1; i < stack.length; i++) {
      if (expression in stack[i]) {
        argObj = stack[i];
        argName = expression;
        break;
      } else if (expression.includes(".")) {
        const dotNotation = expression.split(".");
        const obj = dotNotation.slice(0, -1).reduce((o, i2) => typeof o === "object" ? o[i2] : false, stack[i]);
        if (obj && /^[a-zA-Z0-9_$]+$/.test(last)) {
          argObj = obj;
          argName = dotNotation[dotNotation.length - 1];
          deep = obj !== stack[i];
          break;
        }
      }
    }
    return { argObj, argName, deep };
  }
}

// builds/module.js
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
