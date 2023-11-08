const router = require("express").Router();
const {BlogPost } = require("../../models");
const withAuth = require("../utils/auth");


router.post("/", withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogPost);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const blogPostData = await  BlogPost.update(req.body, {
            where: 
                {
                    id: req.params.id,
                },
        });

        if(!blogPostData){
            res.status(400).json({message: "No blog post found with this id!"});
            return;
           }
           res.status(200).json(blogPostData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
});

router.delete("/:id", async (req, res) => {
    console/log(req.params.id)
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                    id: req.params.id,
                },
        });

        if(!blogPostData){
            res.status(404).json({message: "No blog post found with this id!"});
            return;
           }
           res.status(200).json(blogPostData );
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
});



module.exports = router;