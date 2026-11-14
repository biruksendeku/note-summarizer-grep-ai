import express from "express";
import { execFile } from "child_process";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CORPUS = "./src/text_resources/corpus.txt";
const STOPWORDS = new Set(
  fs
    .readFileSync("./src/text_resources/stopwords.txt", "utf8")
    .split("\n")
    .map((w) => w.trim().toLocaleLowerCase())
    .filter(Boolean),
);

app.get("/ask", (req, res) => {
  res.send(`
    <form action="/ask" method="post">
      <input name="prompt" type="text" placeholder="Enter your keyword..." />
      <button type="submit">Submit</button>
    </form>
    `);
});

app.post("/ask", (req, res) => {
  const prompt = (req.body.prompt || "").toLowerCase().trim();
  if (!prompt) return res.status(400).json({ error: "no prompt" });

  const terms = prompt.split(/\+s/).filter((w) => w && !STOPWORDS.has(w));
  if (!terms.length) return res.json({ matches: [] });

  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = escaped.join("|");

  execFile(
    "grep",
    ["-i", "-E", pattern, CORPUS],
    { maxBuffer: 10 * 1024 * 1024 },
    (err, stdout) => {
      if (err && err.code !== 1) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      const matches = stdout.split("\n").filter(Boolean);
      res.json({ prompt, terms, matches });
    },
  );
});

export default app;
