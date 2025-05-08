const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator')
const AuthenticationMiddleware = require('./apps/middlewares/authentication');
const AuthenticationController = require('./apps/controllers/AuthenticationController');
const AuthSchema = require('./schema/auth.schema.json');
const UserController = require('./apps/controllers/UserController');
const UserSchema = require('./schema/create.user.schema.json');

const routes = new Router();

routes.post('/user', schemaValidator(UserSchema), UserController.create);
routes.post('/auth', schemaValidator(AuthSchema), AuthenticationController.authenticate);
routes.get('/health', (req, res) => {return res.send({message: `Connected with success!`})});

routes.use(AuthenticationMiddleware);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/user-profile', UserController.userProfile);

module.exports = routes;