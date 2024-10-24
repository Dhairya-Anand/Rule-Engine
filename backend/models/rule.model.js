import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

const Rule = mongoose.model("Rule", ruleSchema);

export default Rule;