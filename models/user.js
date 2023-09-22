const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRedexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptions = ["starter", "pro", "business"];
const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailRedexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptions,
    default: "starter"
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  token: String,
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
verificationToken: {
  type: String,
  required: [true, 'Verify token is required'],
}
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRedexp).required(),
  subscription: Joi.string().valid(...subscriptions),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRedexp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRedexp).required(),
  
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
