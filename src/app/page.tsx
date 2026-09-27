import { cookies } from "next/headers";
import { AgeGate } from "@/components/age-gate";
import { ExitScreen } from "@/components/exit-screen";
import { SiteHome } from "@/components/site-home";
import { AGE_COOKIE } from "@/lib/age";
import { getCatalogue } from "@/lib/catalogue";

export const dynamic = "force-dynamic";

export default async function Home() {
  const jar = await cookies();
  const age = jar.get(AGE_COOKIE)?.value;

  if (age === "deny") return <ExitScreen />;
  if (age !== "allow") return <AgeGate />;

  const catalogue = await getCatalogue();
  return <SiteHome catalogue={catalogue} />;
}
