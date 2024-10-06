import { NextResponse } from "next/server";
import * as fs from "fs";
import { promisify } from "util";
import nodemailer from "nodemailer";
import { templateLink } from "./constants";
import dbEnter from "./database";
import path from "path";

const transporter = nodemailer.createTransport({
  pool: true,
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.NM_EMAIL,
    pass: process.env.NM_PASS,
  },
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const toAddress = formData.get("client_email");

    let templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      templateLink[formData.get("budget_range")]
    );

    const readFile = promisify(fs.readFile);
    const html = await readFile(templatePath, "utf8");

    await transporter.sendMail({
      from: `"Liva interiors" <${process.env.NM_EMAIL}>`,
      to: toAddress,
      subject: "We Value Your Feedback",
      html: html,
    });

    return dbEnter(formData);
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.error({
      message: "mail not sent",
      error: error.message,
    });
  }
}
