const path = require("path"); //NEW
const { connection } = require("./connection/database");

const form = (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
};

const user = async (req, res) => {
  const { user_name } = req.body;

  if (!user_name || user_name.trim() === "") {
    return res.status(400).send("Name is required");
  }

  const add = "INSERT INTO Users (user_name) VALUES (?)";
  await connection.query(add, [user_name], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err); //prints console
      return res.status(500).send("Error creating user"); //prints on the screen
    }
    res.send("User successfully created");
  });
};

module.exports = { form, user };
