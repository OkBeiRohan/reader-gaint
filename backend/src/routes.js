const login = require("./controllers/login_register/login");
const register = require("./controllers/login_register/register");

const router = require("express").Router();

/********
 * Defining API Endpoints (Request URL, Method and corresponding function to response)
 */

router.post("/login", login);
router.post("/register", register);
router.get("/test", async (req, res) => {
  return res.json({ status: true });
});

module.exports = router;
