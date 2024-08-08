const express = require("express");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const path = require("path");
const prisma = new PrismaClient();
const app = express();
const upload = multer({ dest: "public/uploads/" });
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Melayani direktori uploads sebagai file statis
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// Route utama
app.get("/", async (req, res) => {
  const items = await prisma.item.findMany();
  res.render("index", { items });
});
// Route untuk menampilkan form tambah items
app.get("/item/new", (req, res) => {
  res.render("new");
});

// Route untuk menampilkan detail item
app.get("/item/:id", async (req, res) => {
  const item = await prisma.item.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (item) {
    res.render("view", { item });
  } else {
    res.status(404).send("Item not found");
  }
});
// Route untuk menambahkan item
app.post("/item", upload.single("image"), async (req, res) => {
  const { name, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  await prisma.item.create({
    data: { name, description, imageUrl },
  });
  res.redirect("/");
});
// Route untuk mengedit item
app.get("/item/:id/edit", async (req, res) => {
  const item = await prisma.item.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.render("edit", { item });
});
// Route untuk mengupdate item
app.post("/item/:id", upload.single("image"), async (req, res) => {
  const { name, description } = req.body;
  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.existingImageUrl;
  await prisma.item.update({
    where: { id: parseInt(req.params.id) },
    data: { name, description, imageUrl },
  });
  res.redirect("/");
});
// Route untuk menghapus item
app.post("/item/:id/delete", async (req, res) => {
  await prisma.item.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
