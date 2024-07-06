import mongooseConnect from "@/lib/mongoose";
import User from "@/models/User";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongooseConnect();
    const { email } = await req.body;
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    if (!user) {
      console.log("No user found with the given email.");
      // Handle the case where no user is found
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
