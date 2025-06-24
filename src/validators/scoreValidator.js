// validators/scoreValidator.js
const Joi = require('joi');

const scoreUpdateSchema = Joi.object({
    playerId: Joi.string().required(),
    region: Joi.string().required(),
    mode: Joi.string().required(),
    score: Joi.number().required()
});

function validateScoreUpdate(req, res) {
    const { error } = scoreUpdateSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return false; 
    }
    return true; 
}

module.exports = validateScoreUpdate;
