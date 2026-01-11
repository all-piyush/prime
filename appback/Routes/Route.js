const express=require("express");
const router=express.Router();

const {Login,Signup,googlelogin}=require('../Controllers/Login');
const {Authorization,logout,checkauth}=require('../Controllers/Authorization');
const{addnote,getnote,deletenote,getnotebyid,updatenote}=require('../Controllers/Notes');
router.post('/login',Login);
router.post('/signup',Signup);
router.post('/authorization',Authorization,checkauth);
router.post('/logout',Authorization,logout);
router.post('/addnote',Authorization,addnote);
router.get('/getnote',Authorization,getnote);
router.post('/getnotebyid',Authorization,getnotebyid);
router.post('/googlelogin',googlelogin);
router.delete('/deletenote',Authorization,deletenote);
router.put('/updatenote',updatenote);
module.exports=router;