const path = require("path"); //NEW
const { connection } = require("../config/database");

const form = (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/form.html"));
};

const userInfo = (req, res) => {
  const { name, email, age, phone, eircode } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Name is required");
  }

  const add =
    "INSERT INTO UsersInfo (user_name, email, age, phone, eircode) VALUES (?,?,?,?,?)";
  connection.query(add, [name, email, age, phone, eircode], (err) => {
    if (err) {
      console.log("Error inserting user:", err);
    }
    res.send("user successfully added");
  });
};

module.exports = { form, userInfo };
