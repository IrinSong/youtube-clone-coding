import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({}); // await -> database에게 결과값을 받을 때까지 기다려줌.
  return res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => res.send("Searching Videos");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
  return res.redirect("/");
};

export const watch = (req, res) => {
  const { id } = req.params;
  // const id = req.parmas.id;
  return res.render("Watch", { pageTitle: `Watching` });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // express.urlencoded({ extended: true })가 있기에 가능.
  return res.redirect(`/videos/${id}`);
};

export const remove = (req, res) => res.send("Delete Video");
