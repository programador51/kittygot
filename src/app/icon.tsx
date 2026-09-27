import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#1c1216",
          color: "#e4c88a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          letterSpacing: 1,
        }}
      >
        K
      </div>
    ),
    size,
  );
}
