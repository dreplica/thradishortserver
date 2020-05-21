import express from "express";
var router = express.Router();

/* GET users listing. */
const usersRouter = router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

export default {
  usersRouter,
};
