const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    commentSection: BASE_JS + "commentSection.js",
  }, // entry: sorce code which i want to transform
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  mode: "development",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"), //where do we want to put our file
    clean: true,
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //webpack은 뒤에서부터 시작
      },
    ],
  },
};
