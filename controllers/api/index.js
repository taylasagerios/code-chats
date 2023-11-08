const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/", userRoutes);
router.use("/", blogPostRoutes);
router.use("/", commentRoutes);

module.exports = router;