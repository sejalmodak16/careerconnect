const db = require("../config/db");

const checkPro = async (req, res, next) => {
  const [user] = await db.query(
    "SELECT plan FROM users WHERE id = ?",
    [req.user.id]
  );

  if (user[0].plan !== "pro") {
    return res.status(403).json({
      message: "PRO plan required",
    });
  }

  next();
};

module.exports = checkPro;