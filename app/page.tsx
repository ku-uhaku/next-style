import { Closing } from "@/components/closing";
import { Formula } from "@/components/formula";
import { Hero } from "@/components/hero";
import { Hours } from "@/components/hours";
import { Manifesto } from "@/components/manifesto";
import { Ritual } from "@/components/ritual";
import { Testament } from "@/components/testament";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Hours />
      <Formula />
      <Ritual />
      <Testament />
      <Closing />
    </>
  );
}
