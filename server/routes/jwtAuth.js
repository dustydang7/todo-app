const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async(req,res) =>{
    try {
        // 1. destructure the req.body (name, email, password)
        const {name, email, password} = req.body;

        //2. check if user exist (if user exist then throw error)
        const user = await pool.query("SELECT * FROM user_acc WHERE user_email = $1", [email])
        
        if(user.rows.length !== 0) {
            return res.status(401).send("user already exist"); //401 unauthenticated
        }

        //3. bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound); //await because it take time

        const bcryptPassword = await bcrypt.hash(password,salt); //await becasue it take time

        //4. enter the new user inside our database

        const newUser = await pool.query("INSERT INTO user_acc (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *", [name, email, bcryptPassword]);

        //5. genetating our jwt token

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        res.json({ jwtToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body

        const {email, password} = req.body;
    
        //2. check if the user doesn't exist (if not then throw error)

        const user = await pool.query("SELECT * FROM user_acc WHERE user_email = $1", [email]);

        if(user.rows.length === 0) {
            return res.status(401).json("password or email is incorrect");
        }

        //3. check if incomming password is the same as the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("password or email is incorrect");
        }

        //4. give them the jwt token

        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({jwtToken});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})

router.get("/is-verify", authorization, async (req, res) =>{
    try {
        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }


});

module.exports = router;