import { CatalogueVideo } from "@/components/catalogue-video";
import { countLabel, type CatalogueItem, type CatalogueResult } from "@/lib/catalogue";

function Preview({ item }: { item: CatalogueItem }) {
  const preview = item.preview;
  if (!preview) {
    return (
      <div className="grid aspect-[4/5] place-items-center bg-[#120c0f] px-4 text-center font-body text-lg text-[#d9cdc4]">
        No preview yet
      </div>
    );
  }

  if (preview.kind === "image") {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-[#120c0f]">
        {/* Preview hosts depend on the Baserow workspace, so these stay plain images. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview.url}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover blur-2xl"
        />
        <div className="relative z-10 flex h-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview.url}
            alt={`Preview of ${item.title}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    );
  }

  if (preview.kind === "video") {
    return (
      <CatalogueVideo
        src={preview.url}
        poster={preview.poster}
        label={`Preview of ${item.title}`}
      />
    );
  }

  return (
    <div className="grid aspect-[4/5] place-items-center bg-[#120c0f] px-4 text-center">
      <p className="font-body text-lg text-[#d9cdc4]">{preview.name}</p>
    </div>
  );
}

function CatalogueCard({ item }: { item: CatalogueItem }) {
  return (
    <article className="flex flex-col border border-line bg-raised">
      <Preview item={item} />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="font-display text-xl leading-tight tracking-wide break-words">{item.title}</h3>
        <p className="font-body text-lg text-muted">
          {countLabel(item.pictures, "picture", "pictures")}
          <span aria-hidden> · </span>
          {countLabel(item.videos, "video", "videos")}
        </p>
        {item.fanslyPost ? (
          <a
            href={item.fanslyPost}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-auto inline-flex min-h-11 items-center justify-center bg-[#6e2432] px-4 font-display text-xs tracking-[0.16em] text-[#f8f1e8] uppercase transition hover:bg-[#581c28]"
          >
            View the set
          </a>
        ) : (
          <p className="mt-auto font-body text-lg text-muted">Purchase link coming soon</p>
        )}
      </div>
    </article>
  );
}

export function Catalogue({ result }: { result: CatalogueResult }) {
  return (
    <section
      id="catalogue"
      aria-labelledby="catalogue-heading"
      className="mx-auto mt-14 w-full max-w-6xl scroll-mt-24 px-4 pb-16 sm:mt-16"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs tracking-[0.28em] text-gold uppercase">Catalogue</p>
        <h2 id="catalogue-heading" className="mt-2 font-display text-3xl tracking-[0.12em] uppercase sm:text-4xl">
          Bundles
        </h2>
        <p className="mt-3 font-body text-xl leading-snug text-muted">
          Each set lists how many pictures and videos it holds. Price and duration are on the post.
        </p>
      </div>

      {result.ok && result.items.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {result.items.map((item) => (
            <CatalogueCard key={item.id} item={item} />
          ))}
        </div>
      ) : null}

      {result.ok && result.items.length === 0 ? (
        <p className="mt-8 text-center font-body text-xl text-muted">No bundles published yet.</p>
      ) : null}

      {!result.ok ? (
        <div className="mx-auto mt-8 max-w-md border border-line bg-raised px-5 py-6 text-center">
          <p className="font-body text-xl text-muted">
            {result.reason === "unconfigured"
              ? "The catalogue is not connected yet."
              : "The catalogue could not be loaded. Try again in a moment."}
          </p>
          {result.reason === "unconfigured" && process.env.NODE_ENV === "development" ? (
            <p className="mt-2 font-body text-lg text-muted">
              Set BASEROW_API_URL, BASEROW_TOKEN, and BASEROW_TABLE_ID.
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
