const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const path = require("path");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = express();
const PORT = process.env.PORT || 3001;

const hbs = handlebars.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(--path.dirname, "public")));

app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});