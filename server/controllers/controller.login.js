const axios=require('axios');
const {getAccessToken, getUserInfo} = require('../config/api.js')
const getLoginUrl = (req, res) => {
    const authUrl = `${process.env.AUTHORIZE_URL}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=read`;
    res.json({ url: authUrl });
};
const handleCallback = async(req, res)=>{
    try {
        const {code} = req.body;
        const token = getAccessToken(code);
        const userInfo = getUserInfo(token);
        res.json(userInfo);
    } catch (error) {
        console.error(error);
    }
};
module.exports = {getLoginUrl,handleCallback};