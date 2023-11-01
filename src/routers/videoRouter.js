import express from "express";
import {
  getUpload,
  postUpload,
  watch,
  getEdit,
  postEdit,
  remove,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(postUpload); // -> upload도 id가 될 수 있으므로 가장 위에 위치해야 함!! (but, 정규식 사용하면 상관X)
videoRouter.get("/:id(\\d+)", watch); // Regular expression (정규식) 사용, ':id'가 없어도 작동은 되지만 request.params.id로 불러오기 위해서 이름을 붙인 것.
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit); // 2개 이상의 HTTP method가 필요할 때 route를 사용.
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.get("/:id(\\d+)/delete", remove);

export default videoRouter;
