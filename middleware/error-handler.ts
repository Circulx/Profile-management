import { NextResponse } from "next/server"

export function handleApiError(error: any) {
  console.error("API Error:", error)

  const message = error.message || "Internal server error"
  const status = error.status || 500

  return NextResponse.json(
    {
      error: message,
      status: status,
    },
    { status: status },
  )
}

