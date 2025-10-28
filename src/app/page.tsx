// import Image from "next/image";
import { ThatCard } from "@/components/that-card";

export default function Home() {
  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        <ThatCard
          title="Complete Intro to doing things"
          author="Jordan Jhonson"
          date="Aug 2025"
          summary="Learn some things, build modern stuff n dolor urna, pulvinar ut massa id, varius vehicula purus. Quisque tristique rhoncus leo, ac consectetur augue ultricies vel. Nunc efficitur ligula libero, et egestas nisl elementum sed. Nullam malesuada dui non ante porttitor, a porttitor ex feugiat. Class aptent."
          href="https://radedev.com/"
        />
        <ThatCard
          title="Doing stuff the right way"
          author="Doe Jane"
          date="Sep 2025"
          summary="Urna, pulvinar ut massa id, varius vehicula purus. Quisque tristique rhoncus leo, ac consectetur augue ultricies vel. Nunc efficitur ligula libero, et egestas nisl elementum sed. Nullam malesuada dui non ante porttitor, a porttitor ex feugiat. Class aptent."
          href="https://afterhour.dev/"
        />
        <ThatCard
          title="APIs that don't suck"
          author="Royston Smith"
          date="Sep 2025"
          summary="Cras a erat semper, congue elit vel, molestie nisi. Nunc eget nisl imperdiet, dignissim enim facilisis, aliquet quam. Curabitur et risus a mauris luctus dictum nec vel nulla. Donec id ligula metus. Orci varius natoque."
          href="https://ko-fi.com/radedev"
        />
        <ThatCard
          title="Would"
          author="Terry MCkinkey"
          date="Aug 2025"
          summary="Quisque commodo, est sit amet tincidunt venenatis, magna velit convallis odio, vel varius eros leo a massa. Sed vulputate neque sed nibh ultricies, et cursus lectus condimentum. Suspendisse in ornare orci. Phasellus in orci et diam semper congue sit amet non tortor. Vivamus ultrices dui at fermentum accumsan. In ac porttitor risus, nec laoreet turpis."
          href="https://github.com/Rade58"
        />
      </main>
    </div>
  );
}
