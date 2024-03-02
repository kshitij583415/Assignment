const express=require('express');
const router=express.Router();
const {upload,register,login,logout}=require("../controller/user");


router.post('/register',upload.single('profilePicture'),register);
router.post('/login',login);
router.post('/logout',logout);

module.exports=router;