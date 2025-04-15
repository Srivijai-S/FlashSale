import Airtable from "airtable";

const apiKey = import.meta.env.VITE_TABLE_KEY;
if (!apiKey) {
  console.error("Airtable API key is missing!");
}

const baseId = "appj3zPaunZeCaqUM";

export const airTable = new Airtable({ apiKey }).base(baseId);
