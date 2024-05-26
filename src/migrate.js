require('dotenv').config(); // Load environment variables at the top
const { Sequelize } = require('sequelize'); // Import Sequelize
const Database = require('./services/database/connect');
const { readdirSync } = require('fs');
const { join } = require('path');

async function migrate() {
  try {
    await Database.authenticate();
    console.log('Connection has been established successfully.');

    const migrationsDir = join(__dirname, 'migrations');
    const migrationFiles = readdirSync(migrationsDir).filter(file => file.endsWith('.js')).sort();

    for (const file of migrationFiles) {
      const migration = require(join(migrationsDir, file));
      await migration.up(Database.getQueryInterface(), Sequelize); // Pass the Sequelize constructor
      console.log(`Migration ${file} ran successfully.`);
    }

    console.log('All migrations ran successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await Database.close();
  }
}

migrate();
