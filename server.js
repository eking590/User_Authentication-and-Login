const express = require('express'); //import the express module 

const path = require('path'); 

const bcrypt = require('bcrypt'); // import the bcrypt modules 

const app = express() 

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 


//list of users, here you can use a database to store your users 
const users = [ 
    
]


//create the users route to get all users  
app.get('/users', (req, res) => {
    res.json(users)
    
}); 

//create a post users route 

app.post('/users',  async (req, res) => {
    try { 
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
       

        const user = { name: req.body.name, password: hashedPassword }
        users.push(user) 
        res.json(users)
        res.status(201).send()


    } catch{
        res.status(500).send() }   

})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name ===  req.body.name)
    if (user == null) {
        return res.status(400).send('cannot find User')
    }
    try { 
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('User successfully logged in')
        } else {
            res.send('User Not Allowed!!')
        }

    } catch  {
        res.status(500).send() 
    }
})






app.listen(3000)