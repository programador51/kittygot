import { Catalogue } from "@/components/catalogue";
import { Monogram, Ornament } from "@/components/ornament";
import { SocialLinks } from "@/components/social-links";
import { profile, socialLinks } from "@/data/profile";
import type { CatalogueResult } from "@/lib/catalogue";

export function SiteHome({ catalogue }: { catalogue: CatalogueResult }) {
  return (
    <>
      <section id="about" className="mx-auto w-full max-w-md scroll-mt-24 px-4 pt-2 pb-2 text-center">
        <Monogram letters={profile.monogram} src={profile.portrait} />
        <h1 className="mt-5 font-display text-4xl tracking-[0.22em] uppercase sm:text-5xl">{profile.name}</h1>
        <p className="mt-3 font-body text-2xl text-blood italic">{profile.tagline}</p>
        <div className="mt-5">
          <Ornament />
        </div>
        <p className="mt-5 font-body text-xl leading-relaxed text-muted">{profile.bio}</p>
        <h2 id="socials" className="mt-10 scroll-mt-24 font-display text-xs tracking-[0.28em] text-gold uppercase">
          Find me
        </h2>
        <SocialLinks links={socialLinks} />
      </section>
      <Catalogue result={catalogue} />
      <footer className="px-4 pb-10 text-center font-display text-[0.68rem] tracking-[0.22em] text-muted uppercase">
        18+ · {profile.name}
      </footer>
    </>
  );
}
