const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Username should be at least 5 characters"],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]+$/.test(v); // Enforce entire string check
        },
        message: (props) =>
          `${props.value} must contain only latin letters and digits!`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password should be at least 8 characters"], // Increased min length
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]+$/.test(v); // Enforce entire string check
        },
        message: (props) =>
          `${props.value} must contain only latin letters and digits!`,
      },
    },
    avatarUrl: {
      type: String,
      default: "https://example.com/default-avatar.png", // Set a default avatar URL
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });
    });
    return; // Return to avoid executing next() again
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
