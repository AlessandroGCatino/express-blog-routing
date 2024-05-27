const express = require("express"); //CommonJS Modules
const router = express.Router();
const postsController = require("../controllers/posts.js")

router.get("/", postsController.index)

router.get("/:slug", postsController.show)

router.get("/create", postsController.create)

router.get("/:slug/download", postsController.download)

module.exports = router;