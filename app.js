import express from "express"; //express framework
import morgan from "morgan"; //http logger mioddleware
import "dotenv/config"; //envirenment variable manager
import rootRouter from "./routes/index.js";
import connectMongoDB from "./config/mongo-config.js";

const PORT = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", rootRouter); 

await connectMongoDB(); // In ES modules, JavaScript allows top-level await.
// In ES modules, any code that is at the top level (not nested inside a function, class, or block) can use await.

//await or use then() 


app.listen(PORT, () => {
	console.log("server running on port " + PORT);
});

