import express from "express";

const fetchRouter = express.Router();

fetchRouter.get("/image/:img", (req, res) => {
  res.sendFile(process.cwd() + "/uploads/" + req.params.img);
});

export default fetchRouter;
