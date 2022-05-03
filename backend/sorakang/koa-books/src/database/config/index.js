const { env } = process;

const development = {
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  host: env.POSTGRES_HOST,
  dialect: env.POSTGRES_DIALECT,
  port: env.POSTGRES_PORT,
};

const test = {
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  host: env.POSTGRES_HOST,
  dialect: env.POSTGRES_DIALECT,
  port: env.POSTGRES_PORT,
};

const production = {
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  host: env.POSTGRES_HOST,
  dialect: env.POSTGRES_DIALECT,
  port: env.POSTGRES_PORT,
};

module.exports = { development, test, production };
