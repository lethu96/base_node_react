const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        name: {
            type: String,
            default: '',
            required: true,
        },
        username: {
            type: String,
            default: '',
            required: true,
        },
        email: {
            type: String,
            default: '',
            lowercase: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            default: '',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

module.exports = mongoose.model('User', UserSchema);