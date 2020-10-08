"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var UsersController_1 = __importDefault(require("@modules/users/infra/http/controllers/UsersController"));
var UsersAvatarController_1 = __importDefault(require("@modules/users/infra/http/controllers/UsersAvatarController"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var usersRouter = express_1.Router();
var upload = multer_1.default(upload_1.default);
var userController = new UsersController_1.default();
var useravatarController = new UsersAvatarController_1.default();
usersRouter.post('/', userController.create);
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), useravatarController.update);
exports.default = usersRouter;
