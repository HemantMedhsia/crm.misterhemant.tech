import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { masterRouter } from "./Routes/master.Routes.js";

const app = express();

// Whitelist of allowed origins
const whitelist = [
  "https://mainpage.vedanshtiwari.tech",
  "http://localhost:5174",
  "https://new-school-application-haryana-8pqf.vercel.app",
  /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:5174$/,
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      whitelist.some((allowedOrigin) =>
        allowedOrigin instanceof RegExp
          ? allowedOrigin.test(origin)
          : allowedOrigin === origin
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to our School. Deployment is complete  Master");
});

app.use("/api", masterRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).json({ error: message });
});

export { app };
