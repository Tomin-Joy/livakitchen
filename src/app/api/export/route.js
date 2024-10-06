import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import ExcelJS from "exceljs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { secret } = body;

    // Check if the provided value matches the environment variable
    if (secret !== process.env.EXPORT_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("clients");
    const collection = db.collection("clients");

    // Retrieve documents from the collection
    const documents = await collection.find({}).toArray();

    // Generate Excel file using ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Client_Data_@");

    // Define columns for the Excel sheet
    worksheet.columns = [
      { header: "client_name", key: "client_name", width: 30 },
      { header: "client_location", key: "client_location", width: 30 },
      { header: "client_email", key: "client_email", width: 30 },
      { header: "service_type", key: "service_type", width: 30 },
      { header: "budget_range", key: "budget_range", width: 30 },
    ];

    // Add rows to the worksheet from MongoDB documents
    documents.forEach((doc) => {
      worksheet.addRow({
        client_name: doc.client_name,
        client_location: doc.client_location,
        client_email: doc.client_email,
        service_type: doc.service_type,
        budget_range: doc.budget_range,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    // Set headers to download the file as an Excel file
    const headers = new Headers();
    headers.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    headers.set(
      "Content-Disposition",
      `attachment; filename="documents_${Date.now()}.xlsx"`
    ); // Set file name dynamically

    // Return the Excel file as a response
    return new Response(buffer, {
      headers: headers,
    });
  } catch (error) {
    console.error("Error generating Excel:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
