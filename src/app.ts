import { Command } from "commander";
import "dotenv/config"


const program = new Command();

program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program.command("helloWorld").action(async () => {
  console.log("Hello Commander!");
});

program.parse();
