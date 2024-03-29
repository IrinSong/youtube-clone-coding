import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 8 },
  createdAt: { type: Date, required: true, default: Date.now }, // Date.now()를 사용하면 함수가 바로 실행됨.
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }],
});

// videoSchema.pre("save", async function () {
//   // middleware는 무조건 model이 생성되기 전에 만들어야 함.
//   this.hashtags = this.hashtags[0]
//     .replaceAll(" ", "")
//     .replaceAll("#", "")
//     .split(",")
//     .map((word) => `#${word}`);
// });
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .replaceAll(" ", "")
    .replaceAll("#", "")
    .split(",")
    .map((word) => `#${word}`);
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
