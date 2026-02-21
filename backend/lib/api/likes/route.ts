import { NextResponse } from "next/server";
import { supabase } from "@/backend/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { comment_id } = await req.json();

    if (!comment_id) {
      return NextResponse.json({ error: "comment_id is required" }, { status: 400 });
    }

    // 1. Insert the like into the likes table
    const { error: likeError } = await supabase
      .from("likes")
      .insert({ comment_id });

    if (likeError) throw likeError;

    // 2. Increment the likes count using the SQL function
    const { error: updateError } = await supabase.rpc('increment_likes', { 
      row_id: comment_id 
    });

    if (updateError) throw updateError;

    return NextResponse.json({ message: "Liked successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}