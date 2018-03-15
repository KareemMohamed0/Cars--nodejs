var Sequalize = require('sequelize');
var connection = new Sequalize(
    'db1b6042c64eed45ec8078a8a401717af4', 'goerbslorhvlnumn', 'He4E3SX3vygZjhXenMUnBeehhWocknwvzzwzBHHCSqtMLJyHAVo2cqcDaUxfCVQh', {
        host: '1b6042c6-4eed-45ec-8078-a8a401717af4.mysql.sequelizer.com',
        dialect: 'mysql',
        operatorsAliases: false,
        port: 3306,
    })

connection.sync({
    // force: true,
});
//user table 
var User = connection.define('users', {
    username: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 30],
            emailPatrn: (email) => {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(email))
                    throw new Error('not valid email')
            }
        }
    },
    password: {
        type: Sequalize.STRING,
        allowNull: false,
        // validate: {
        //     len: [7, 30],
        // }
    }
})

//car table 
var Car = connection.define('cars', {
    model: {
        type: Sequalize.STRING,
        allowNull: false,

    },
    year: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: Sequalize.STRING,
        allowNull: false
    }
})
var Make = connection.define('makes', {
    make: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: {
            args: true,
            message: 'Maker must be unique.',
        },
    },
})
var Country = connection.define('countries', {
    country: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: {
            args: true,
            message: 'Country must be unique.',
        },
    },
})

Car.belongsTo(Make);
Car.belongsTo(Country);

module.exports = { User, Car, Make, Country };

