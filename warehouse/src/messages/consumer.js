const kafka = require("kafka-node");
const eventType = require("./eventType");

const topic = process.env.TOPIC;
partition = 0;

exports.createConsumer = async () => {
  const client = new kafka.KafkaClient({ kafkaHost: `${process.env.BROKER_URI}:9092` });
  const offset = new kafka.Offset(client);

  //Latest Offsets
  const latestOffset = await new Promise((resolve, reject) => {
    offset.fetchLatestOffsets(
      [topic],
      function (error, offsets) {
        if (error) return error;
        resolve(offsets[topic][partition]);
      }
    );
  });

  const consumer = new kafka.Consumer(
    client,
    [{ topic: topic, partition: 0, offset: latestOffset }],
    {
      autoCommit: false,
      fromOffset: true,
      encoding: "buffer",
    }
  );

  return consumer;
};

exports.subscribe = async (consumer, readCallback) => {
  consumer.on("message", (message) => {

    try{
      readCallback(eventType.fromBuffer(message.value))
    }catch(e){
      console.error('Message not valid:'+message.value.toString())
    }
  });
};
