export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) => res.send("Searching Videos");
export const upload = (req, res) => res.send("Upload New Videos");
export const watch = (req, res) => res.render("Watch");
export const edit = (req, res) => res.render("edit");
export const remove = (req, res) => res.send("Delete Video");
