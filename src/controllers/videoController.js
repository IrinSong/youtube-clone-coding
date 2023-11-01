let videos = [
  {
    title: "Fisrt Video",
    rating: 5,
    comments: 2,
    createdAt: 2,
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: 2,
    views: 1,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: 2,
    views: 59,
    id: 3,
  },
];

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const search = (req, res) => res.send("Searching Videos");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};

export const watch = (req, res) => {
  const { id } = req.params;
  // const id = req.parmas.id;
  const video = videos[id - 1];
  return res.render("Watch", { pageTitle: `Watching: ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // express.urlencoded({ extended: true })가 있기에 가능.
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const remove = (req, res) => res.send("Delete Video");
