const axios = require('axios');
const { getOAuthToken, getPilotSummary } = require('../config/api');

const getAuthorizationUrl = async () => {
    try {
        const openIdConfig = await axios.get('https://api.ivao.aero/.well-known/openid-configuration').then(res => res.data);
        const authorizationUrl = openIdConfig.authorization_endpoint;

        const link = `${authorizationUrl}?client_id=57b2d957-38ff-4d1e-8d8f-7e5aa8d0d5fe&redirect_uri=http://localhost:3000&response_type=code&scope=tracker`;
        console.log("Authorization URL:", link);
        return link;
    } catch (error) {
        console.error("Error generating authorization URL:", error);
    }
};

const login = async (req, res) => {
    const { code } = req.query; 
    try {
        const token = await getOAuthToken(code);
        const pilotSummary = await getPilotSummary(token.access_token);
        return {
            token: token,
            pilotSummary: pilotSummary
        };
    } catch (error) {
        console.error('Error during login or fetching pilot data:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch pilot data' });
    }
};

module.exports = { getAuthorizationUrl, login };
