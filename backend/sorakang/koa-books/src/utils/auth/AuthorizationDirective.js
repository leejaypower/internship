const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const { ApolloError } = require('apollo-server-koa');

const AuthorizationDirective = (schema, directiveName) => mapSchema(schema, {
  [MapperKind.FIELD]: (fieldConfig, _fieldName, typeName) => {
    const authDirective = getDirective(schema, fieldConfig, directiveName);

    if (authDirective && authDirective.length) {
      const requiredRoles = authDirective[0].requires;

      if (requiredRoles && requiredRoles.length) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = (source, args, context, info) => {
          if (!requiredRoles.includes(context.code)) {
            throw new ApolloError('NOT AUTHORIZED', 'NO_AUTH');
          }
          console.log(`==> ${context.code} ACCESSING PRIVATE RESOLVER: ${info.fieldName}`);
          // logging추가하기
          return resolve(source, args, context, info);
        };

        return fieldConfig;
      }
    }
  },
});

module.exports = { AuthorizationDirective };
