import Rule from "../models/rule.model.js";

const createController = async (req, res) => {
  try {
    const { ruleName, ruleString } = req.body;
    if (!ruleName || !ruleString) {
      return res.status(400).json({
        error: "Invalid input: 'ruleName' and 'ruleString' are required.",
      });
    }

    const rule = await Rule.findOne({ rule_name: ruleName });
    if (rule) {
      return res.status(404).json({ error: "Rule already exists" });
    }

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

      if (!tokens || tokens.length === 0) {
        throw new Error(`Invalid rule format: ${infix}`);
      }

      for (const token of tokens) {
        if (
          !isNaN(token) ||
          /^[a-z]+$/.test(token) ||
          /^'[^']*'$/.test(token)
        ) {
          output.push(token.replace(/^'|'$/g, ""));
        } else if (token === "(") {
          operators.push(token);
        } else if (token === ")") {
          while (operators.length && operators[operators.length - 1] !== "(") {
            output.push(operators.pop());
          }
          if (!operators.length) {
            throw new Error("Mismatched parentheses.");
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
        } else {
          throw new Error(`Invalid token found: ${token}`);
        }
      }

      while (operators.length) {
        const op = operators.pop();
        if (op === "(" || op === ")") {
          throw new Error("Mismatched parentheses.");
        }
        output.push(op);
      }

      return output.join(" ");
    };

    const postfix = infixToPostfix(ruleString);

    const newRule = new Rule({
      rule_name: ruleName,
      rule: ruleString,
      postfix_expr: postfix,
    });

    await newRule.save();

    res.status(201).json({
      message: "New rule created successfully.",
      rule: newRule,
    });
  } catch (error) {
    console.error("Error during rule creation:", error.message);
    res.status(500).json({
      error: error.message || "Internal server error during rule creation",
    });
  }
};

export default createController;