import { TechOrbit } from "@/components/hero/TechOrbit";
import type { OrbitNode } from "@/components/hero/TechOrbit";
import { TerminalWindow } from "@/components/hero/TerminalWindow";
import { TechIcon } from "@/components/ui/TechIcon";
import { orbitTech } from "@/data/heroTerminal";

/** Terminal + orbiting stack. Purely illustrative, hidden from assistive technologies. */
export function HeroVisual() {
  const nodes: OrbitNode[] = orbitTech.map(({ tech, x, y }) => ({
    tech,
    x,
    y,
    icon: <TechIcon tech={tech} className="size-3.5" brandOnHover={false} />,
  }));

  const stackIcons = orbitTech.map(({ tech }) => (
    <TechIcon key={tech} tech={tech} className="size-4" brandOnHover={false} />
  ));

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg lg:max-w-none lg:px-12 lg:py-16">
      <TechOrbit nodes={nodes} />
      <div className="relative z-10">
        <TerminalWindow stackIcons={stackIcons} />
      </div>
    </div>
  );
}
