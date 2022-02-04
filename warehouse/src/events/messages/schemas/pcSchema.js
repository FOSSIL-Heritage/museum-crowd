const avro = require("avsc");

module.exports = avro.Type.forSchema({
  type: "record",
  fields: [
    {
      name: "id",
      type: "string",
    },
    {
      name: "timestamp",
      type: "string",
    },
    {
      name: "direction",
      type: "string",
    },
  ],
});
