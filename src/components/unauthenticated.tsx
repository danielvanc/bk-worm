import React from "react";
import Image from "next/image";
import { useAuth } from "context/auth";
// import styles from "styles/unauthenticated.module.css";

export default function Unauthenticated() {
  const { session } = useAuth();
  return (
    <div className="grid grid-cols-8 gap-3 lm:grid-cols-12 lm:gap-4 auto-rows-auto">
      <div className="col-start-2 col-span-2 row-start-1 row-span-1">
        <Image src="/img/logo.svg" alt="" width="131" height="38" />
      </div>

      <header className="grid grid-cols-8 gap-3 uppercase text-grayWorm-300 col-span-full row-start-2 row-span-1">
        <h1 className="col-start-1 col-span-6 row-start-1 row-span-full opacity-5 leading-tighter lm:leading-10 lm:opacity-100  font-fred text-hMedium lm:text-hSmall desktop:text-hLarge desktop:leading-none">
          Read more
        </h1>
        <h2 className="font-fred text-grayWorm-300 text-sm lm:text-base desktop:text-h2Normal desktop:leading-3 col-start-2 col-span-5 row-start-1 row-end-2 self-center">
          Find read and spread your love for books
        </h2>
        <p className="font-fred text-grayWorm-300 text-sm lm:text-xl col-start-2 col-span-5 row-start-1 row-end-2 self-end">
          Let your mind escape
        </p>
      </header>

      <main className="row-start-3 row-span-1 col-start-2 col-span-5">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <div>
          <button onClick={() => session.signIn()}>Sign in</button>
        </div>
        <h3>Why sign up?</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
      </main>
    </div>
  );
}
