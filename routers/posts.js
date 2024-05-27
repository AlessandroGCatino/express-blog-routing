const express = require("express"); //CommonJS Modules
const router = express.Router();
const postsController = require("../controllers/posts.js")

router.get("/", postsController.index)

//inseriamo prima il create perchè altrimenti verrebbe letto come slug
router.get("/create", postsController.create)

router.get("/:slug", postsController.show)

router.get("/:slug/download", postsController.download)

module.exports = router;