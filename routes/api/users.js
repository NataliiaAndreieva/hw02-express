const express = require('express');

const ctrl = require('../../controllers/users/auth')

const router = express.Router();

const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);


router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify/", validateBody(schemas.emailSchema), ctrl.resendVarifyEmail );

module.exports = router;
