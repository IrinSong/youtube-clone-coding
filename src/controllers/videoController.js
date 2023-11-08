import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" }); // await -> database에게 결과값을 받을 때까지 기다려줌.
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
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" }); // return을 써주는 이유는 이 function이 render 후에 종료되도록 하기 위함.
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      // await -> 데이터를 database에 전송하는데 시간이 걸리기 때문
      // await에서 에러가 생기면 아무것도 실행되지 않음. 넘어가기 위해서 try catch 를 사용
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const watch = async (req, res) => {
  const { id } = req.params; // id로 비디오를 찾을 수 있음.(-> mongoose queries)
  // const id = req.parmas.id;
  const video = await Video.findById(id); // .exex() -> execute를 호출하면 promise가 return 됨. but, 우리는 async await을 사용하고 있으므로 필요X
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" }); // 에러처리 -> reutrn!!
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body; // express.urlencoded({ extended: true })가 있기에 가능.
  const video = await Video.exists({ _id: id }); // postEdit에서 video object를 검색할 필요가 없음. 따라서 대신 boolean 값을 받음. 따라서 findById() => exists()
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title: title,
    description: description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
