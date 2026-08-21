import { Hero } from "./sections/Hero";
import { BrowseRange } from "./sections/BrowseRange";
import { OurProducts } from "./sections/OurProducts";
import { Rooms } from "./sections/Rooms";
import { Forniture } from "./sections/Forniture";

export function Home() {
  return (
    <main>
      <Hero />
      <BrowseRange />
      <OurProducts />
      <Rooms />
      <Forniture />
    </main>
  );
}