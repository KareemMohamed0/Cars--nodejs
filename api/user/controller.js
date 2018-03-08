const userService = require('./service');
const User = require('../../database/db').User;

async function register(req, res) {

    try {
        let user = req.body;

        let validUser = userService.userValidation(user);

        if (!validUser)
            return res.status(400).send({ msg: 'please enter valid form ' });

        user.password = await userService.hashPassword(user.password);

        // let token = await userService.generatetoken(user);

        let createdUser = await User.create(user);

        if (!createdUser)
            return res.send({ msg: "faild to create user " });

        return res.status(200).json({ msg: 'User registred', createdUser });


    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error });
    }

}

async function authenticate(req, res) {

    try {
        let user = req.body;

        let validUser = userService.userValidation(user);

        if (!validUser)
            return res.status(400).send({ msg: 'please enter valid form ' });

        let userFound = await User.findOne({ where: { email: user.email } });
        if (!userFound)
            return res.status(400).send({ msg: "email not found " });

        let passwordMatche = await userService.compareHashPassword(user.password, userFound.password);

        if (!passwordMatche)
            return res.status(400).send({ msg: "wrong password " });


        let token = await userService.generatetoken(userFound);

        return res.status(200).json({ token: `Bearer ${token}`, msg: 'User authenticated' });


    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error });
    }

}


async function userProfile(req, res) {
    try {
        return res.send({ msg: req.user });
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });

    }
}



module.exports = {
    authenticate,
    register,
    userProfile,

};