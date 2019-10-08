import validators from '../validators';

const { request } = validators;

export const validateBody = (req, keys) => request(req, keys);
