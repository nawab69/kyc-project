import express from "express";

const fetchRouter = express.Router();

fetchRouter.get("/image/:img", (req, res) => {
  const { name } = req.body;
  res.sendFile(process.cwd() + "/public/uploads/" + req.params.img);
});

export default fetchRouter;
