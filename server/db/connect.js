const { sequelize, Product, User } = require("../models");

const { DATA } = require("../seed/data");

// seed function
const seedDB = async () => {
  try {
    await Promise.all(DATA.map((item) => Product.create(item)));
  } catch (e) {
    console.log(e);
  }
};

const connectDB = async () => {
  await sequelize.sync({ force: true });
  await seedDB();
  return sequelize.authenticate();
};

module.exports = connectDB;
