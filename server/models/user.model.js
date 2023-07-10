const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const emailRegex = /^\S+@\S+\.\S+$/;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Full name is required"],  // this is the error message if the field is empty
        minlength: [2, "Full name must be at least 2 characters long"]  // this is the error message if the field is too short
    },
    /* email: {
        type: String,
        required: [true, "Email is required"], // this is the error message if the field is empty
        minlength: [5, "Email must be at least 5 characters long"] // this is the error message if the field is too short
    }, */
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [5, "Email must be at least 5 characters long"],
        validate: {
            validator: function (value) {
                return emailRegex.test(value);
            },
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"], // this is the error message if the field is empty
        minlength: [8, "Password must be at least 8 characters long"] // this is the error message if the field is too short
    },
}, { timestamps: true });


// This is not a field in the database, but rather a virtual field.
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

// This is a mongoose middleware function that will run before any validation.
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// This is a mongoose middleware function that will run before saving a document.
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = model("User", UserSchema);
module.exports = User;