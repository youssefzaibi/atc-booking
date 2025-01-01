const axios=require('axios');
require('dotenv').config();
async function getAccessToken(code) {
    try {
      const response = await axios.post(process.env.TOKEN_URL, {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      });
      return response.data.access_token;
    } catch (err) {
      console.error(err);
    }
}
async function getUserInfo(accessToken) {
    try {
      const response = await axios.get(process.env.RESOURCE_URL, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
}
module.exports = {
    getAccessToken,
    getUserInfo
};