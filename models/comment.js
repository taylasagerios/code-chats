const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { BlogPost } = require(".");


class Comment extends Model{}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateCreated: {
            type: DataTypes.Date,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        blogPost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "blogPost",
                key: "id",
            }, 
        },
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
);

module.exports = Comment;