const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema(
  {
    rule_name: {
      type: String,
      required: true,
    },
    rule:{
        type: String,
        required: true,
    },
    postfix_expr: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Rule = mongoose.model("Rule", ruleSchema);

module.exports = Rule;