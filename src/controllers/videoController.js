import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}); // await -> database에게 결과값을 받을 때까지 기다려줌.
  return res.render("home", { pageTitle: "Home", videos }); // return이 없어도 정상적으로 동작하지만, 실수 방지를 위해 사용.
};
export const search = (req, res) => res.send("Searching Videos");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" }); // return을 써주는 이유는 이 function이 render 후에 종료되도록 하기 위함.
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      // await -> 데이터를 database에 전송하는데 시간이 걸리기 때문
      // await에서 에러가 생기면 아무것도 실행되지 않음. 넘어가기 위해서 try catch 를 사용
      title: title,
      description: description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
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
  const { id } = req.params;
  // const id = req.parmas.id;
  const video = await Video.findById(id); // id로 비디오를 찾을 수 있음.(-> mongoose queries)
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body; // express.urlencoded({ extended: true })가 있기에 가능.
  return res.redirect(`/videos/${id}`);
};

export const remove = (req, res) => res.send("Delete Video");
