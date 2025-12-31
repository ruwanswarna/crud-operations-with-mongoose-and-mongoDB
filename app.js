import express from "express";
import morgan from "morgan";
import "dotenv/config";
import rootRouter from "./routes/index.js";

const PORT = process.env.PORT;
const app = express();

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/",rootRouter);

app.listen(PORT, () => {
	console.log("server running on port "+PORT);
});
