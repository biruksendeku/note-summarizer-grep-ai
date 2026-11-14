import { execFile } from "child_process";
const CORPUS = "../text_resources/corpus.txt";
console.log("CORPUS: ", CORPUS);
import { createTerms } from "../utils/createTerms";
import { createPattern } from "../utils/createPattern";

export const summarizeGet = (req, res) => {
  res.send(`
    <form action="/ask" method="post">
      <input name="prompt" type="text" placeholder="Enter your keyword..." />
      <button type="submit">Submit</button>
    </form>
    `);
};

export const summarizePost = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "no prompt" });

  const terms = createTerms(prompt);
  if (!terms.length) return res.json({ matches: [] });
  const pattern = createPattern(terms);

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
};
