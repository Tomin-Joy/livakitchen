import * as google from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { NextResponse } from "next/server";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

const jwt = new google.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY,
  scopes: SCOPES,
});

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, jwt);

export default async function appendToSheet(data) {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow(data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("Error appending to sheets");
    console.error(error);
    return NextResponse.error({ success: false, error: error });
  }
}
