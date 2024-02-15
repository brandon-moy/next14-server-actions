"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeProp[]>([]);

  // by using useEffect and having inView in the dependency array, when the ref becomes in view, it will trigger the useEffect
  useEffect(() => {
    if (inView) {
      // fetches more data, and then spreads the current data while also adding the spread of the response
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      {/* this first section is for any subsequently added pages */}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        {/* by adding ref={ref}, when the page reaching the ref (from useInView), something will happen */}
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
