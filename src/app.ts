import { Command } from "commander";
import "dotenv/config";
import { db, messaging } from "./firebase";
import { listAll, sendPushNotification } from "./lib";

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

program
  .command("sendMessage")
  .requiredOption("-t, --token <string>", "Must have a user registration token")
  .requiredOption("-b, --body <string>", "Message must have a body")
  .option("-i, --title <string?>", "Optional title")
  .action(async (options) => {
    await sendPushNotification(messaging, options.token, options.body, options.title);
  });

program.parse();
