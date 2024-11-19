const {signup, getAllUsers} = require("../controllers/usersController");
const {login} = require("../controllers/usersController");
const {setAvatar} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);

module.exports = router;