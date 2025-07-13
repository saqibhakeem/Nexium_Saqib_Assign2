import { supabase } from "@/lib/supabase-connection";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("test_table").select("*");

  if (error) {
    return NextResponse.json({ success: false, error: error.message });
  }

  return NextResponse.json({ success: true, data });
}
