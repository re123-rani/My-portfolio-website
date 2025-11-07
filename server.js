const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));

//app.use(express.json());

// Serve index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Serve social life page
app.get("/social.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "social.html"));
});

// Resume download
app.get("/Rekha3.pdf", (req, res) => {
  res.download(path.join(__dirname, "Rekha3.pdf"), "Rekha_Rani_Resume.pdf");
});

// Contact form (configure with your Gmail app password)
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "veerrekha62@gmail.com",   // your Gmail
        pass: ""       // generated App Password
      }
    });

    await transporter.sendMail({
      from: email,
      to: "your-email@gmail.com",
      subject: `Portfolio Contact from ${name}`,
      text: message
    });

    res.json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
