import app from "./app.js";
import cloudinary from "cloudinary";
import cors from "cors";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "PUT", "DELETE", "POST"],
  credentials: true,
}));

// Handle preflight requests
app.options('*', cors({
  origin: allowedOrigins,
  methods: ["GET", "PUT", "DELETE", "POST"],
  credentials: true,
}));


app.get('/',(req,res)=>{
  res.send("Hello World")
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
