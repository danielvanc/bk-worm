import React from "react";
import Image from "next/image";
import { useAuth } from "context/auth";
// import styles from "styles/unauthenticated.module.css";

export default function Unauthenticated() {
  const { session } = useAuth();
  return (
    <div>
      <Image src="/img/logo.svg" alt="" width="131" height="38" />
      <header className="uppercase text-grayWorm-300">
        <h1 className="opacity-5 leading-tighter lm:leading-10 lm:opacity-100  font-fred text-hMedium lm:text-hSmall desktop:text-hLarge desktop:leading-none">
          Read more
        </h1>
        <h2 className="font-fred text-grayWorm-300 text-sm lm:text-base desktop:text-h2Normal desktop:leading-3">
          Find read and spread your love for books
        </h2>
        <p className="text-sm lm:text-xl">Let your mind escape</p>
      </header>

      <main>
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
