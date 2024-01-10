import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner"); // await -> database에게 결과값을 받을 때까지 기다려줌.
  return res.render("home", { pageTitle: "Home", videos }); // return이 없어도 정상적으로 동작하지만, 실수 방지를 위해 사용.
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"), // MongoDB 기능: regex <- regular expression, i <- 대문자 소문자 구분 없이 해주는 역할
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload Video" }); // return을 써주는 이유는 이 function이 render 후에 종료되도록 하기 위함.
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      // await -> 데이터를 database에 전송하는데 시간이 걸리기 때문
      // await에서 에러가 생기면 아무것도 실행되지 않음. 넘어가기 위해서 try catch 를 사용
      title,
      description,
      videoUrl: video[0].path,
      thumbUrl: thumb[0].path,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    req.flash("success", "업로드 완료!");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const watch = async (req, res) => {
  const { user } = req.session;
  const { id } = req.params; // id로 비디오를 찾을 수 있음.(-> mongoose queries)
  // const id = req.parmas.id;
  const video = await Video.findById(id).populate("owner").populate("comments"); // .exex() -> execute를 호출하면 promise가 return 됨. but, 우리는 async await을 사용하고 있으므로 필요X
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" }); // 에러처리 -> reutrn!!
  }
  return res.render("videos/watch", { pageTitle: video.title, video, user });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "허용되지 않은 접근입니다.");
    return res.status(403).redirect("/");
  }
  return res.render("videos/edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  //const { file } = req;
  const { title, description, hashtags } = req.body; // express.urlencoded({ extended: true })가 있기에 가능.
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "해당 비디오의 소유주가 아닙니다.");
    return res.status(403).redirect("/");
  }
  video.title = title;
  video.description = description;
  video.hashtags = Video.formatHashtags(hashtags);
  await video.save();
  req.flash("success", "변경되었습니다.");
  return res.redirect(`/videos/${id}`);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "해당 비디오의 소유자가 아닙니다.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200); //ok
};

export const createComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { user },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    video: id,
    owner: user._id,
    owner_avatar: user.avatarUrl,
    owner_name: user.name,
  });
  video.comments.push(comment._id); // 새 코멘트의 id를 손수 넣어줘야 함
  video.save();
  return res.status(201).json({ newCommentId: comment._id }); // frontend에 새로 생긴 댓글의 id를 보내기 위함
};

export const deleteComment = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { videoId, commentId },
  } = req;
  const { owner } = await Comment.findById(commentId);
  const video = await Video.findById(videoId);
  console.log(owner);
  if (String(owner) !== String(_id)) {
    return res.sendStatus(403);
  }
  if (!video) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndDelete(commentId);
  return res.sendStatus(200);
};
