const fs = require('fs');
const path = require('path');
const user_db = path.join('data','usuario.json');

module.exports ={
    getUser : () => {
        return JSON.parse(fs.readFileSync(user_db, 'utf-8'))
    },
    setUser : (data) => {
        fs.writeFileSync(user_db,JSON.stringify(data,null,2), 'utf-8')
    }
} 












