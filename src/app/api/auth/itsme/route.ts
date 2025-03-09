/*
 *   Copyright (c) 2025 Laith Alkhaddam aka Iconical or Sleepyico.
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET as string;

export const config = {
  runtime: "nodejs",
};

export async function GET() {
  const token = (await cookies()).get("authToken");
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token?.value, SECRET);
    return NextResponse.json({ message: "Authenticated", user: decoded });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        { message: "Invalid or expired token", error: err.message },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid or expired token", error: "Unknown error" },
        { status: 401 }
      );
    }
  }
}
