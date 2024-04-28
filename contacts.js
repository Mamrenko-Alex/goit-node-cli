import { nanoid } from "nanoid";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = join(__dirname, "db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("error =>", error);
  }
}

export async function getContactById(contactId) {
  try {
    const contasts = await listContacts();
    return contasts.find(({ id }) => id === contactId) || null;
  } catch (error) {
    console.log("error =>", error);
  }
}

export async function removeContact(contactId) {
  try {
    const contasts = await listContacts();
    const removedContact = await getContactById(contactId);
    if (!removeContact) {
      return null;
    }
    const newContasts = contasts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContasts, null, 2));
    return removedContact;
  } catch (error) {
    console.log("error =>", error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contasts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contasts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contasts, null, 2));
    return newContact;
  } catch (error) {
    console.log("error =>", error);
  }
}
