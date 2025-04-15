const getUniqueValues = (products, value) => {
  let result = products.map((product) => {
    return product[value];
  });

  if (value === "colors") {
    return [...new Set(result.flat(10))];
  }

  result = [...new Set(result)];
  return result;
};

export default getUniqueValues;
