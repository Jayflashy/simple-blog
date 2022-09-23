const { connect, connection } = require("mongoose");

const DBConnect = async () => {
  try {
    await connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`Database is successfully connected...`);

    connection.on("disconnected", () => {
      console.log("mongoDB disconnected!");
    });
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};
// export module
module.exports = DBConnect;
