const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require("validator");
const {Error} = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Number, default: 1 }, // 0 - nieaktywne, 1 - user, 2 - admin
    date: { type: Date, default: Date.now }
});

userSchema.statics.register = async function(username, fullname, email, password) {
    //Walidacja
    if (!username || !fullname || !email || !password) {
        throw new Error("Wszystkie pola powinny być wypełnione")
    }
    if(!validator.isEmail(email)){
        throw new Error("Email nie jest poprawnym adresem")
    }
    if(password.length<6){
        throw new Error("Hasło powinno mieć co najmniej 6 znaków")
    }
    //Sprawdzenie czy jest w użyciu
    let exists = await this.findOne({username})
    if (exists) {
        throw new Error("Login jest już w użyciu")
    }
    exists = await this.findOne({email})
    if (exists) {
        throw new Error("Email jest już w użyciu")
    }
    //Hashowanie hasła
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(password, salt)
    //Rejestracja
    const user = await this.create({username, fullname, email, password: hashPassword})
    return user
}

userSchema.statics.login = async function(username, password){
    if (!username || !password) {
        throw new Error("Wszystkie pola powinny być wypełnione")
    }
    let user = await this.findOne({username})
    if (!user) {
        throw new Error("Nieprawidłowy login")
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error("Nieprawidłowe hasło")
    }
    return user
}

module.exports = mongoose.model('User', userSchema)
