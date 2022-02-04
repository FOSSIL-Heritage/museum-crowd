const kafka = require("kafka-node");

class Producer {
  constructor(topic, schema) {
    this.topic = topic;
    this.client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
    this.producer = null;
    this.schema = schema;
  }

  async connect() {
    this.producer = new kafka.Producer(this.client);
    await this.producer.on("ready", () => {});
  }

  publish(message, sendCallback) {
    const payloads = [
      {
        topic: this.topic,
        messages: this.schema.toBuffer(message),
        partition: 0,
      },
    ];

    this.producer.send(payloads, sendCallback);
  }
}

module.exports = Producer;