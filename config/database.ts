export default ({ env }) => ({
  connection: {
    client: 'better-sqlite3',
    connection: {
      filename: env('DATABASE_FILENAME', './database/data.db'),
    },
    useNullAsDefault: true,
    debug: false,
  },
});
