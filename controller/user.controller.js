const { AppError, catchAsync, sendResponse } = require("../helpers/utils.helper");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const userController = {};

userController.register = catchAsync(async (req, res, next) => {
    let { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) throw new AppError(409, "User already exists", "Register Error");

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({
        name,
        email,
        password,
    });
    const accessToken = await user.generateToken();

    return sendResponse(
        res,
        200,
        true,
        { user, accessToken },
        null,
        "Create user successful"
    );
});

//admin create user
userController.createUser = catchAsync(async (req, res, next) => {
    let { name, email, password, role, avatarUrl } = req.body;

    let user = await User.findOne({ email });
    if (user) throw new AppError(409, "User already exists", "Register Error");

    const salt = await bcrypt.genSaltSync(10);
    console.log(typeof salt, typeof password)
    password = await bcrypt.hash("haha", salt);
    console.log(password)
    user = await User.create({
        name,
        email,
        password,
        role,
        avatarUrl
    });
    const accessToken = await user.generateToken();

    return sendResponse(
        res,
        200,
        true,
        { user, accessToken },
        null,
        "Create user successful"
    );
});


module.exports = userController