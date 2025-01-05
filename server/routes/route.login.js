const express = require('express');
const router = express.Router();
const { getAuthorizationUrl, login } = require('../controllers/controller.login');

router.get('/auth/connect', async (req, res) => {
    try {
        const authUrl = await getAuthorizationUrl();
        res.json(authUrl);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get authorization URL' });
    }
});

router.get('/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const tokenResponse = await login(req, res); 

        if (!res.headersSent) {
            res.json({
                success: true,
                token: tokenResponse.token,
                pilotSummary: tokenResponse.pilotSummary
            });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

module.exports = router;