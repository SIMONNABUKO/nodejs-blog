const express = require("express");
const app = new express();
const expressEdge = require("express-edge");
const edge = require("edge.js");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");
const User = require("./database/models/User");

const storePost = require("./middleware/storePost");
const authMiddleware = require("./middleware/auth");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticated");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/loginController");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const mongoStore = require("connect-mongo");
app.use(express.static("public"));
app.use(fileUpload());
app.use(expressEdge.engine);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  expressSession({
    secret: "secret",
    store: mongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/blog",
    }),
  })
);
app.use(connectFlash());
app.use('/posts/store',storePost)
app.use("*", async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  edge.global("auth", req.session.userId);
  edge.global("user", user);
  next();
});

app.set("views", `${__dirname}/views`);

 (async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/blog", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (err) {

        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
})();
app.get("/", homePageController);
app.get('/posts/new',authMiddleware, createPostController);
app.post('/posts/store', storePost, storePostController);
app.get('/post/:id', getPostController);
app.get('/auth/register',redirectIfAuthenticatedMiddleware, createUserController);
app.post('/users/register',storeUserController);
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);
app.get("/auth/logout", logoutController);
app.post('/users/login', loginUserController);
app.listen(3000, () => console.log("listening on port 3000"));
