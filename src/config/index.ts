import extend from "lodash/extend";

const environment = process.env.NODE_ENV || "development";

export default extend(
  {
    environment,
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require(`${__dirname}/env/${environment}`) /* eslint "import/no-dynamic-require": 0 */
);
