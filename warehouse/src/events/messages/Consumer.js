const kafka = require("kafka-node");

class Consumer {
  constructor(topic, schema) {
    this.client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
    this.offset = new kafka.Offset(this.client);
    this.consumer = null;
    this.topic = topic;
    this.schema = schema;
    this.partition = 0;
  }

  async connect() {
    const _this = this;

    //Latest Offsets
    const latestOffset = await new Promise((resolve, reject) => {
      this.offset.fetchLatestOffsets([_this.topic], function (error, offsets) {
        if (error) return error;
        resolve(offsets[_this.topic][_this.partition]);
      });
    });

    this.consumer = new kafka.Consumer(
      this.client,
      [
        {
          topic: _this.topic,
          partition: _this.partition,
          offset: latestOffset,
        },
      ],
      {
        autoCommit: false,
        fromOffset: true,
        encoding: "buffer",
      }
    );
  }

  subscribe(readCallback) {
    this.consumer.on("message", (message) => {
      try {
        readCallback(this.schema.fromBuffer(message.value));
      } catch (e) {
        console.error("Invalid message:", message.value.toString());
      }
    });
  }
}

module.exports = Consumer;
