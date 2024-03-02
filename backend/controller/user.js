const User=require('../model/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const multer=require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

const register = async (req, res) => {
    if (req.body.password !== req.body.cPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    console.log("Request Body:", req.body);

    try {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                console.error("Error generating salt:", err);
                return res.status(500).json({ message: "Error generating salt" });
            }
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).json({ message: "Error hashing password" });
                }
                try {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        profilePicture:req.file.path
                    });
                    const data = await newUser.save();
                    data ? res.status(200).json({ message: "User created" }) : console.log("error while creating new user");
                } catch (err) {
                    console.log("Error>>", err);
                    res.status(500).json({ message: "Error" });
                }
            });
        });
    } catch (err) {
        console.error("Error in register function:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const login=async(req,res)=>{
    try{
        const userLogin=await User.findOne({email:req.body.email});
        if(!userLogin) return res.status(404).json({message:"User not found"});
        const isPasswordCorrect=await bcrypt.compare(req.body.password,userLogin.password);
        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid Credentials"});
        const token=jwt.sign({id:userLogin._id},process.env.SECRET_KEY);
        res.cookie("access_token",token,{
            httpOnly:true
        })
        const {password,...otherDetails}=userLogin._doc;
        res.status(200).json(otherDetails);
    }
    catch(err)
    {
        res.status(500).json({message:'Server Error'});
        console.log(err);
    }
}



const logout=async(req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json({message:"Logged Out"});
}


module.exports={upload,register,login,logout};