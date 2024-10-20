const Rule = require("../models/rule.model");

const createController = async (req, res) => {
  const { ruleName, ruleString } = req.body;

  const infixToPostfix = (infix) => {
    const precedence = {
      ">=": 2,
      "<=": 2,
      ">": 2,
      "<": 2,
      "=": 2,
      AND: 1,
      OR: 1,
    };

    const output = [];
    const operators = [];
    const tokens = infix.match(/([a-zA-Z]+|'[^']*'|\d+|[><=()]|AND|OR)/g);

    for (const token of tokens) {
      if (!isNaN(token) || /^[a-z]+$/.test(token) || /^'[^']*'$/.test(token)) {
        output.push(token.replace(/^'|'$/g, ""));
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          output.push(operators.pop());
        }
        operators.pop();
      } else if (token in precedence) {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      }
    }

    while (operators.length) {
      output.push(operators.pop());
    }

    return output.join(" ");
  };

  const postfix = infixToPostfix(ruleString);

  const newRule = new Rule({
    rule_name: ruleName,
    rule: ruleString,
    postfix_expr: postfix,
  });
  try {
    await newRule.save();
    res.status(201).json({
        message:"New rule created successfully",
        rule : newRule,
    })
  } catch (error) {
    console.log("error", error.message);
    res.json(error.message);
  }
};

module.exports = createController;
