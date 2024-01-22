import OpenAI from "openai";
import readlineSync from "readline-sync";
import colors from "colors";
import { config } from "dotenv";

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: userInput }],
        model: "gpt-3.5-turbo",
      });
      const response = chatCompletion.choices[0].message.content;
      if (userInput === "bye") {
        break;
      }
      console.log(colors.green("Bot: ") + response);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
