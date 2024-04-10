import { Command } from "commander";
import "dotenv/config";
import { db } from "./firebase";
import { listAll } from "./lib";

const program = new Command();

program
  .name("commander-template")
  .description("Template for bootstrapping CLI apps using Commander.")
  .version("1.1.0");

program.command("helloWorld").action(async () => {
  console.log("Hello Commander!");
});

program
  .command("listAll")
  .option("-c --collection <string>", "Name of collection to list")
  .description("Lists all documents in collection")
  .action(async (options) => {
    await listAll(options.collection, db);
  });

program.parse();
