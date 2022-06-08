const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  // NOTE: 날짜 데이터 타입을 위한 Custom Scalar Type
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(Number(ast.value));
    }
    return null;
  },
});

module.exports = {
  dateScalar,
};
