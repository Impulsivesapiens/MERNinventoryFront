import { connectMongoDB } from "@/lib/mongodb";
import { People } from "@/models/People";
import bcrypt from "bcryptjs";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  try {
    const { name, email, password } = await req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await People.create({ name, email, password: hashedPassword });

    return res
      .status(200)
      .json({ message: "People registered." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        { message: "An error occurred while registering the People." },
        { status: 500 }
      );
  }
}

export default handler;
