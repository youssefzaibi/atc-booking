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

        // Assuming the login function handles the response by itself
        const tokenResponse = await login(req, res); // Make sure login doesn't send a response itself

        // If login function does not send a response, you can send it here
        if (!res.headersSent) {
            res.json({
                success: true,
                token: tokenResponse.token,
                pilotSummary: tokenResponse.pilotSummary
            });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to log in' });
    }
});

module.exports = router;