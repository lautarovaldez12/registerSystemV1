const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {getUser,setUser} = require(path.join('..','data','usuarios.js'));


let users = getUser();


module.exports = {
    register : (req,res) =>{
        res.render('index',{
            error : ''

        })
    },
    login : (req,res) =>{
        res.render('login')
    },
    registerProcess : (req,res, next) =>{
        
        const {nombre,apellido,email,pass,pass2} = req.body;

        let userId = 0;

        

        
        users.forEach(user => {
            if(user.id > userId){
                userId = user.id
            };
            
        });
        let chekEmail = users.find(user => email === user.email);

        if(chekEmail){
            return res.render('index',{
                error : 'ese email ya esta en uso'
            })
        }else{
            
            switch (true) {  
                case !nombre:
                    return res.render('index',{
                        error : "campo del nombre vacio"
                    })
                    break;
                case !apellido:
                    return res.render('index', {
                        error : "campo del apellido vacio"
                    });
                    break;
                case !email:
                    return res.render('index',{
                        error : "campo del email vacio"
                    })
                    break;
                            
            }

            if(pass != pass2){
                return res.render("index", {
                    error : "Las contraseñas no coinciden"
                })
            }

            let newUser = {
                id : userId + 1,
                name : nombre,
                lastName : apellido,
                email,
                password : bcrypt.hashSync(pass,12),
                img : req.files[0].filename
            }
    
    
            users.push(newUser);
            
            
            
            setUser(users)
    
            res.redirect('login')
            
            
        }
            
    },
    loginProcess : (req,res) =>{
        const {email, pass} = req.body;

        let emailCheck = users.find(user => email === user.email);

        if(emailCheck){
            if(bcrypt.compareSync(pass,emailCheck.password)){
                return res.render('user',{
                    dataUser : emailCheck
                });
            }

        }

        res.render('login',{
            error : "Correo o usuario incorrecto"
        })

    }
}