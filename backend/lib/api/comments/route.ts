import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      likes_count:likes(count)
    `)
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error }, { status: 500 })

  const formatted = data.map((c: any) => ({
    id: c.id,
    username: c.user_name, // Map user_name (DB) -> username (Frontend)
    text: c.content,       // Map content (DB) -> text (Frontend)
    likes: c.likes_count?.[0]?.count || 0,
    liked_by_me: false, 
    created_at: c.created_at,
  }))

  return NextResponse.json({ data: formatted })
}

export async function POST(req: Request) {
  try {
    const { username, text } = await req.json()

    const { data, error } = await supabase
      .from("comments")
      .insert({ 
        user_name: username, // Map frontend -> DB
        content: text        // Map frontend -> DB
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}