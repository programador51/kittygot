export type PreviewMedia = {
  url: string;
  kind: "image" | "video" | "file";
  name: string;
  poster: string | null;
};

export type CatalogueItem = {
  id: number;
  title: string;
  pictures: number;
  videos: number;
  fanslyPost: string | null;
  preview: PreviewMedia | null;
};

export type CatalogueResult =
  | { ok: true; items: CatalogueItem[] }
  | { ok: false; reason: "unconfigured" | "unavailable" };

type BaserowThumb = { url?: string; width?: number; height?: number };

type BaserowFile = {
  url?: string;
  mime_type?: string;
  is_image?: boolean;
  visible_name?: string;
  name?: string;
  thumbnails?: Record<string, BaserowThumb | null> | null;
};

type BaserowRow = {
  id?: number;
  title?: string | null;
  pictures?: number | string | null;
  videos?: number | string | null;
  fansly_post?: string | null;
  preview?: BaserowFile[] | null;
};

type BaserowPage = {
  next?: string | null;
  results?: BaserowRow[];
};

function apiOrigin(): string | null {
  const raw = process.env.BASEROW_API_URL?.trim() || "https://api.baserow.io";
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function asHttpUrl(value: unknown, base?: string): string | null {
  if (typeof value !== "string" || value.trim() === "") return null;
  try {
    const url = base ? new URL(value, base) : new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function asCount(value: unknown): number {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.round(number));
}

function bestThumbnail(file: BaserowFile, base: string): string | null {
  const thumbs = Object.values(file.thumbnails ?? {}).filter(
    (thumb): thumb is BaserowThumb => Boolean(thumb?.url),
  );
  thumbs.sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  const chosen = thumbs.find((thumb) => (thumb.width ?? 0) >= 320) ?? thumbs[0];
  return asHttpUrl(chosen?.url, base);
}

function toPreview(file: BaserowFile | undefined, base: string): PreviewMedia | null {
  if (!file) return null;
  const url = asHttpUrl(file.url, base);
  if (!url) return null;
  const name = file.visible_name || file.name || "Preview";
  const mime = file.mime_type ?? "";
  const poster = bestThumbnail(file, base);

  if (file.is_image || mime.startsWith("image/")) {
    return { url, kind: "image", name, poster: null };
  }
  if (mime.startsWith("video/")) {
    return { url, kind: "video", name, poster };
  }
  return { url, kind: "file", name, poster: null };
}

function toItem(row: BaserowRow, base: string): CatalogueItem | null {
  if (typeof row.id !== "number") return null;
  const title = row.title?.trim() || "Untitled bundle";
  const preview = toPreview(row.preview?.[0], base);
  return {
    id: row.id,
    title,
    pictures: asCount(row.pictures),
    videos: asCount(row.videos),
    fanslyPost: asHttpUrl(row.fansly_post),
    preview,
  };
}

export async function getCatalogue(): Promise<CatalogueResult> {
  const token = process.env.BASEROW_TOKEN?.trim();
  const tableId = process.env.BASEROW_TABLE_ID?.trim() || "1225033";
  const origin = apiOrigin();

  if (!token || !origin || !/^\d+$/.test(tableId)) {
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const items: CatalogueItem[] = [];
    let next: string | null = `${origin}/api/database/rows/table/${tableId}/?user_field_names=true`;
    let pages = 0;

    while (next && pages < 10) {
      const response = await fetch(next, {
        headers: { Authorization: `Token ${token}` },
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) {
        return { ok: false, reason: "unavailable" };
      }
      const page = (await response.json()) as BaserowPage;
      for (const row of page.results ?? []) {
        const item = toItem(row, origin);
        if (item) items.push(item);
      }
      next = page.next ? asHttpUrl(page.next, origin) : null;
      pages += 1;
    }

    return { ok: true, items };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}

export function countLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}
