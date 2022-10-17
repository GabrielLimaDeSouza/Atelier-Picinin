const bcrypt = require('bcrypt')

module.exports = { 
     async createPasswordHash(password) {
        return bcrypt.hash(password, 10)
    },
    checkPassword(userPassword, password) {
        return bcrypt.compare(password, userPassword)
    }
}