import Rule from "../models/rule.model.js";

const evaluateController = async (req, res) => {
  try {
    const { ruleName, data } = req.body;
    if (!ruleName) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'ruleName' is required." });
    }
    if (!data || typeof data !== "object") {
      return res
        .status(400)
        .json({ error: "Invalid input: 'data' must be a valid object." });
    }
    const rule = await Rule.findOne({ rule_name: ruleName });

    if (!rule) {
      return res.status(404).json({ error: "Rule not found" });
    }

    const postfixExpression = rule.postfix_expr;

    const evaluatePostfix = (postfix, data) => {
      const tokens = postfix.split(" ");
      const stack = [];

      tokens.forEach((token) => {
        if (token === "AND" || token === "OR") {
          const b = stack.pop();
          const a = stack.pop();
          if (token === "AND") {
            stack.push(a && b);
          } else if (token === "OR") {
            stack.push(a || b);
          }
        } else if (token === ">" || token === "<" || token === "=") {
          const b = stack.pop();
          const a = stack.pop();
          if (token === ">") {
            stack.push(a > b);
          } else if (token === "<") {
            stack.push(a < b);
          } else if (token === "=") {
            stack.push(a === b);
          }
        } else {
          if (token in data) {
            stack.push(data[token]);
          } else {
            stack.push(isNaN(token) ? token : Number(token));
          }
        }
      });

      return stack.pop();
    };
    const result = evaluatePostfix(postfixExpression, data);

    res.status(200).json({
      message: "Rule evaluated successfully",
      evaluationResult: result,
    });
  } catch (error) {
    console.error("Error during rule evaluation:", error.message);
    res.status(500).json({ error: "Error during rule evaluation" });
  }
};

export default evaluateController;