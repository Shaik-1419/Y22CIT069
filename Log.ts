const LOGGING_API_URL = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJza3NoYWZlZW5hYmFudUBnbWFpbC5jb20iLCJleHAiOjE3NTcxMzc1MTcsImlhdCI6MTc1NzEzNjYxNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImEwMzBiMjkxLTcxMTctNDIyYy1iMjQ3LWRmNjViYThiNGIwYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlrIHNoYWZlZW5hIGJhbnUiLCJzdWIiOiIzY2VjM2M4Yi05MmNkLTQ5ZWItODJjMS02MDQwZmI5ZTcxZDQifSwiZW1haWwiOiJza3NoYWZlZW5hYmFudUBnbWFpbC5jb20iLCJuYW1lIjoic2hhaWsgc2hhZmVlbmEgYmFudSIsInJvbGxObyI6InkyMmNpdDA2OSIsImFjY2Vzc0NvZGUiOiJRZnpuZGsiLCJjbGllbnRJRCI6IjNjZWMzYzhiLTkyY2QtNDllYi04MmMxLTYwNDBmYjllNzFkNCIsImNsaWVudFNlY3JldCI6IldZQU1HQXRyeHpwZlp2WkQifQ.LWteJQU1FElpN00cwzG3xSPxkZc0D5Clg2qKfZn-b4w"; // Replace with your actual token

interface LogData {
  stack: string;
  level: string;
  package: string;
  message: string;
}

export async function Log(stack: string, level: string, packageName: string, message: string): Promise<void> {
  const logPayload: LogData = { stack, level, package: packageName, message };

  try {
    const response = await fetch(LOGGING_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJza3NoYWZlZW5hYmFudUBnbWFpbC5jb20iLCJleHAiOjE3NTcxMzc1MTcsImlhdCI6MTc1NzEzNjYxNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImEwMzBiMjkxLTcxMTctNDIyYy1iMjQ3LWRmNjViYThiNGIwYSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYWlrIHNoYWZlZW5hIGJhbnUiLCJzdWIiOiIzY2VjM2M4Yi05MmNkLTQ5ZWItODJjMS02MDQwZmI5ZTcxZDQifSwiZW1haWwiOiJza3NoYWZlZW5hYmFudUBnbWFpbC5jb20iLCJuYW1lIjoic2hhaWsgc2hhZmVlbmEgYmFudSIsInJvbGxObyI6InkyMmNpdDA2OSIsImFjY2Vzc0NvZGUiOiJRZnpuZGsiLCJjbGllbnRJRCI6IjNjZWMzYzhiLTkyY2QtNDllYi04MmMxLTYwNDBmYjllNzFkNCIsImNsaWVudFNlY3JldCI6IldZQU1HQXRyeHpwZlp2WkQifQ.LWteJQU1FElpN00cwzG3xSPxkZc0D5Clg2qKfZn-b4w`,
      },
      body: JSON.stringify(logPayload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Failed to send log:", response.status, response.statusText, text);
    } else {
      console.log("✅ Log sent successfully");
    }
  } catch (error) {
    console.error("Logging error:", error);
  }
}
