import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import appendToSheet from "../../../../lib/google";

export default async function dbEnter(formData) {
  try {
    const client = await clientPromise;
    var db = client.db("clients");
    var form = {
      client_name: formData.get("client_name"),
      client_location: formData.get("client_location"),
      client_email: formData.get("client_email"),
      service_type: formData.get("service_type"),
      budget_range: formData.get("budget_range"),
    };
    await db.collection("clients").insertOne(form);
    return appendToSheet(form);
  } catch (error) {
    return NextResponse.error({ message: "db error", error: error });
  }
}
