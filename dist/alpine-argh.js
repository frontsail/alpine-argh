(() => {
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

  // builds/browser.js
  document.addEventListener("alpine:init", () => window.Alpine.plugin(src_default));
})();
//# sourceMappingURL=alpine-argh.js.map
