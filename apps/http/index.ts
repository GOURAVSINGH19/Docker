import express from "express";
import prisma from "@repo/db/client"
const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
        where: { username: { not: null } }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, password },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});