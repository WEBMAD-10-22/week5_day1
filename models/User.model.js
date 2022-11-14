const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  if (this.isNew) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash1 = bcrypt.hashSync(this.password, salt);
    this.password = hash1;
  }
  next();
});

const UserModel = model('User', userSchema);

module.exports = UserModel;
