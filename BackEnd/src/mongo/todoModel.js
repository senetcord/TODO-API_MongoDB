const { Schema, model } = require("mongoose");

const TodoListSchema = Schema(
  {
    text: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

module.exports = model("TodoList", TodoListSchema);
