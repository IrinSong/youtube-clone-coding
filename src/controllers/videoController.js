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
export const upload = (req, res) => res.send("Upload New Videos");
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
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const remove = (req, res) => res.send("Delete Video");
