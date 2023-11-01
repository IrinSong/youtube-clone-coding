import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/youtube");

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Conneted to DB");
const handleError = (error) => console.log("🚨 DB Error: ", error);
db.once("open", handleOpen); // on과 once의 차이: on은 여러번 계속 발생, once는 오로지 한번만 발생.
db.on("error", handleError); // 에러 발생 시 콘솔에 표시.
