// import { NextResponse } from "next/server";
// import { connectToMongo } from "@/lib/mongo-connection";
// import mongoose from "mongoose";

// export async function GET() {
//   try {
//     await connectToMongo();

//    // const collections = await mongoose.connection.db.listCollections().toArray();

//     const names = collections.map((col) => col.name);

//     return NextResponse.json({ success: true, collections: names });
//   } catch (err) {
//     return NextResponse.json({ success: false, error: err });
//   }
// }
