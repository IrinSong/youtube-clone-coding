// require("dotenv").config(); -> 필요한 파일에 모두 넣어줘야 함.
import "dotenv/config";
import app from "./server";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";

const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
