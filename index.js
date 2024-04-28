import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const getListContacts = await listContacts();
        console.log(getListContacts);
      } catch (error) {
        console.log("error =>", error);
      }
      break;

    case "get":
      try {
        const getContact = await getContactById(id);
        console.log(getContact);
      } catch (error) {
        console.log("error =>", error);
      }
      break;

    case "add":
      try {
        const addedContact = await addContact(name, email, phone);
        console.log(addedContact);
      } catch (error) {
        console.log("error =>", error);
      }
      break;

    case "remove":
      try {
        const deletedContact = await removeContact(id);
        console.log(deletedContact);
      } catch (error) {
        console.log("error =>", error);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
