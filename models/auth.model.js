const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const DB_URL = "mongodb://localhost:27017/online-shop";

const userShema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userShema);

exports.createNewUser = (username, email, password) => {
  // check if email exists
  // yes => error
  // no => create new account

  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("email is used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        let user = new User({
          username: username,
          email: email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.login = (email, password) => {
  //check for email
  // no => error
  // yes => check for password
  //no => error
  //yes => set session
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => User.findOne({ email: email }))
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("there is no user matches this email");
        } else {
          bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("password is incorrect");
            } else {
              mongoose.disconnect();
              resolve(user._id);
            }
          });
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
