import {validationResult, body, param} from 'express-validator';

export const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
}

export const validateDNI = [
    body('dni')
        .trim()
        .exists().withMessage('DNI es requerido'),
    validateResult
];