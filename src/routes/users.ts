import express, { Request, Response } from "express";
import { post_short_Url } from "../controllers/requests";

const router = express.Router();

export const post_url = router.post(
  "/shorten",
  async (req: Request, res: Response) => {
    const url = req.body["url"];
    try {
      const result = await post_short_Url(url);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "server error" });
    }
  }
);
