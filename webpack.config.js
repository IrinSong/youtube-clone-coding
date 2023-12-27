const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js", // entry: sorce code which i want to transform
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"), //where do we want to put our file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"], //webpack은 뒤에서부터 시작
      },
    ],
  },
};
