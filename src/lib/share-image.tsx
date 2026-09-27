import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const shareImageSize = { width: 1200, height: 630 };
export const shareImageAlt = "Kittygot monogram on a dark ground";

const cinzel = await readFile(join(process.cwd(), "src/fonts/Cinzel-Regular.ttf"));
const cormorant = await readFile(join(process.cwd(), "src/fonts/CormorantGaramond-Italic.ttf"));

export function shareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0c090c",
          color: "#f6eee6",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            border: "1px solid #413038",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 132,
                height: 132,
                borderRadius: 66,
                border: "2px solid #e4c88a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e4c88a",
                fontSize: 40,
                fontFamily: "Cinzel",
                letterSpacing: "0.22em",
              }}
            >
              KG
            </div>
            <div
              style={{
                marginTop: 36,
                fontSize: 68,
                fontFamily: "Cinzel",
                letterSpacing: "0.22em",
                display: "flex",
              }}
            >
              KITTYGOT
            </div>
            <div
              style={{
                marginTop: 22,
                width: 180,
                height: 1,
                background: "#e4c88a",
                display: "flex",
              }}
            />
            <div
              style={{
                marginTop: 22,
                fontSize: 36,
                fontFamily: "Cormorant Garamond",
                fontStyle: "italic",
                color: "#e7b3bc",
                display: "flex",
              }}
            >
              A gothic corner for links and sets
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...shareImageSize,
      fonts: [
        { name: "Cinzel", data: cinzel, style: "normal", weight: 400 },
        { name: "Cormorant Garamond", data: cormorant, style: "italic", weight: 400 },
      ],
    },
  );
}
