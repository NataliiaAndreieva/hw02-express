const { Schema, model } = require('mongoose');
// const Joi = require('joi');

// const { handleMongooseErrors } = require('../helpers');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
}, { versionKey: false, timestamps: true });

const schemas = {
  userSchema,
};

module.exports = {
  schemas,
};
