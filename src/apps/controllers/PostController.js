const Posts = require('../models/Posts');

class PostController {
    async create(req, res) {
        const { image, description } = req.body;
        
        const newPost = await Posts.create({
            image,
            description,
            author_id: req.userId
        });

        if (!newPost) {
            return res.status(400).json({ message: 'Created post failed...' });
        }

        return res.status(200).json({ post: newPost });
    }

    async delete(req, res) {
        const { id } = req.params;

        const verifyPost = await Posts.findOne({
            where: {
                id
            }
        });

        if(!verifyPost) {
            return res.status(404).json({ message: 'Post does not exists...' });
        }

        if(verifyPost.author_id != req.userId) {
            return res.status(401).json({ message: `You don't have permission to delete this post...` });
        }

        const deletedPost = await Posts.destroy({
            where: {
                id
            }
        });

        if(!deletedPost) {
            return res.status(400).json({ message: 'Failed to delete this post...' });
        }

        return res.status(200).json({ message: 'Post deleted...' });
    }

    async update(req, res) {
        const { id } = req.params;
        const { image, description } = req.body;

        const verifyPost = await Posts.findOne({
            where: {
                id
            }
        });
        
        if(!verifyPost) {
            return res.status(404).json({ message: 'Post does not exists...' });
        }

        if(verifyPost.author_id != req.userId) {
            return res.status(401).json({ message: `You don't have permission to update this post...` });
        }

        await Posts.update (
            {
                description: description || verifyPost.description,
                image: image || verifyPost.image
            },
            {
                where: {
                    id: verifyPost.id
                }
            }
        );

        if(!Posts.update) {
            res.status(400).json({ message: 'Failed to update this post...' });
        }

        return res.status(200).json({ message: 'Post updated...' });
    }

    async addLike(req, res) {
        const { id } = req.params;

        const verifyPost = await Posts.findOne({
            where: {
                id
            }
        });
        
        if(!verifyPost) {
            return res.status(404).json({ message: 'Post does not exists...' });
        }

        const postUpdate = await Posts.update(
            { number_likes: verifyPost.number_likes + 1 },
            { where: { id } }
        );

        if(!Posts.update) {
            res.status(400).json({ message: 'Failed to add like in this post...' });
        }

        return res.status(200).json({ message: 'Like storage...' });
    }
};

module.exports = new PostController();