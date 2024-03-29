const dev = require('../models/dev');

module.exports = {
    async store( req, res) {
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await dev.findById(user);
        const targetDev = await dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json('dev not exists');
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};