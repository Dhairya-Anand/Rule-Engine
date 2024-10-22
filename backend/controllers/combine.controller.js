import Rule from "../models/rule.model.js";

const combineController = async (req, res) => {
  try {
    const { ruleName, rules } = req.body;

    if (!rules || rules.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'rules' must be a non-empty array." });
    }

    const rule = await Rule.findOne({ rule_name: ruleName });
    if (rule) {
      return res.status(404).json({ error: "Rule already exists" });
    }

    const infixToPostfix = (infix) => {
      const precedence = {
        ">": 2,
        "<": 2,
        "=": 2,
        ">=": 2,
        "<=": 2,
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
          throw new Error(`Invalid token: ${token}`);
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

    const combinedInfix = rules.join(" AND ");

    const combinedPostfix = infixToPostfix(combinedInfix);
    const newRule = new Rule({
      rule_name: ruleName,
      rule: combinedInfix,
      postfix_expr: combinedPostfix,
    });

    await newRule.save();

    return res.status(201).json({
      message: "New combined rule created successfully.",
      rule: newRule,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default combineController;