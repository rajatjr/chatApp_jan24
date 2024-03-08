const Users=require ("../models/UserModel.js");
const bcrypt= require ("bcrypt");
const jwt= require("jsonwebtoken");

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

exports.Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword)
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            confPassword:confPassword
        });
        res.json({ msg: "Registration Successful" });
    } catch (error) {
        console.log(error);
    }
}



exports.login=async(req,res)=>{
    try {
        const { email,password}=req.body;
        const user1= await Users.findOne({where:{email}})
        if(user1) {
            const cmpPwd = bcrypt.compareSync(password, user1.password);
            if(cmpPwd) {
                const token= jwt.sign({user: user1},"secretkey");
                return res.status(200).json({success:true, token});
            }
        }
        else{
            res.json({success:false, msg:"invalid user"})
        }
        
    } catch (error) {
        console.log(error)
    }
};


exports.Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}