const router = require("express").Router();
const { Blogpost, User, Comment } = require("./models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const blogPostData = await Blogpost.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: ["comment_body"],
                },
            ],
        });
        const blogPosts = blogPostData.map((blogPost) =>
            blogPost.get({ plain: true })
        );
        res.render("homepage", {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/blogPost/:id", withAuth, async (req, res) => {
    try {
        const blogPostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: [User],
                },
            ],
        });
        const blogPosts = blogPostData.get({ plain: true });
        console.log("blogPost");

        res.render("blogPost", {
            ...blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
        res.redirect("/login");
    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"]},
            include: [
                {
                    model: BlogPost,
                    attributes: [User],
                },
                {
                    model: Comment,
                },
            ],
        });
        const users = userData.get({ plain: true });
        console.log("user");

        res.render("dashboard", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/create", withAuth, async (req, res) => {
    try {
       if(req.session.logged_in){
        res.render("create", {
            logged_in: req.session.logged_in,
            userId: req.session.user_id,
        });
        return;
       }else{
        res.redirect("/login");
       }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/create/:id", withAuth, async (req, res) => {
    try {
        const blogPostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: [User],
                },
            ],
        });
        const blogPosts = blogPostData.get({ plain: true });
        console.log("blogPost");

        if(req.session.logged_in){
            res.render("edit", {
                ...blogPost,
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
           }else{
            res.redirect("/login");
           }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
});

router.all("/login", (req, res) => {

       if(req.session.logged_in){
        res.redirect("/dashboard");
        return; 
        }
        res.render("login");
});

module.exports = router;





