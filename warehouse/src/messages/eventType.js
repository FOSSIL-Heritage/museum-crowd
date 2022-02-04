const avro = require("avsc");

module.exports = avro.Type.forSchema({
  type: "record",
  fields: [
    {
      name: "camera",
      type: [{
        type:"record",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "crowd",
            type: "int",
          },
          {
            name: "timestamp",
            type: "string",
          },
        ],
      }, "null"]
    },
    {
      name: "pc",
      type: [{
        type:"record",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "direction",
            type: "string",
          },
          {
            name: "timestamp",
            type: "string",
          },
        ],
      }, "null"]
    },
  ],
});
