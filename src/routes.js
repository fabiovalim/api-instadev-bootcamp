const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator')
const AuthenticationController = require('./apps/controllers/AuthenticationController');
const AuthSchema = require('./schema/auth.schema.json');
const UserController = require('./apps/controllers/UserController');
const UserSchema = require('./schema/create.user.schema.json');

const routes = new Router();

routes.post('/user', schemaValidator(UserSchema), UserController.create);

routes.post('/auth', schemaValidator(AuthSchema), AuthenticationController.authenticate);

routes.get('/health', (req, res) => {
    return res.send({message: `Connected with success!`});
});

module.exports = routes;