const User = require('../models/User');
// index (lista de sessões), show (mostrar única sessão), store (criar sessão), update (atualizar sessão), destroy (finalizar sessão)

module.exports = {
    async store(req, res) {
        // const email = req.body.email;
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};