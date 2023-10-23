import express from "express";
import { upload, watch, edit, remove } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload); // -> upload도 id가 될 수 있으므로 가장 위에 위치해야 함!!
videoRouter.get("/:id(\\d+)", watch); // Regular expression (정규식) 사용, ':id'가 없어도 작동은 되지만 request.params.id로 불러오기 위해서 이름을 붙인 것.
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", remove);

export default videoRouter;
