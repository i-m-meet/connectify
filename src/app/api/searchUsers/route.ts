// src/app/api/searchUsers/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase();

    if (!query) {
        return NextResponse.json({ error: "Invalid search query" }, { status: 400 });
    }

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { username: { contains: query } },
                    { name: { contains: query } },
                ],
            },
            select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
            },
            take: 10,
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to search users" }, { status: 500 });
    }
}
