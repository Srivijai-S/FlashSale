const items = [
  {
    name: "john",
    age: 20,
  },
];
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
