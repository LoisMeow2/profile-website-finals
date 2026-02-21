import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

    // 2. Increment the likes count on the comments table 
    // (This keeps your 'likes' column in sync with the 'likes' table)
    const { error: updateError } = await supabase.rpc('increment_likes', { 
      row_id: comment_id 
    });

    // NOTE: If you haven't created the 'increment_likes' function in SQL yet, 
    // the code below explains how to do it.

    return NextResponse.json({ message: "Liked successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}