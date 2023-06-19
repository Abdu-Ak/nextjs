'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
} from "next-auth/react";

const Nav = () => {

   const {data : session} = useSession();
   
    const [toggle, setToggle] = useState(false);

    const [providers, setProviders] = useState(null);


    useEffect(() => {
      (async () => {
        const res = await getProviders();
       
        setProviders(res);
      })();
    }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            className="object-contain"
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={30}
            height={30}
          />

          <p className="logo_text">Promptopia</p>
        </Link>

        {/* /\desktop navigation */}
        <div className="sm:flex hidden ">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5 items-center ">
              <Link href={"/create-prompt"} className="black_btn ">
                Create Post
              </Link>

              <button
                type="button"
                onClick={() => {
                  signOut: Boolean;
                }}
                className="outline_btn "
              >
                Sign Out
              </button>
              <Link href={"/profile"}>
                <Image
                  src={session?.user.image}
                  alt="profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
 {/* mobile navigation*/}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => {
                  setToggle((prev) => !prev);
                }}
              />

              {toggle && (
                <div className="dropdown">
                  <Link
                    href={"/profile"}
                    className="dropdown_link"
                    onClick={() => setToggle(false)}
                  >
                    My profile
                  </Link>
                  <Link
                    href={"/create-prompt"}
                    className="dropdown_link"
                    onClick={() => setToggle(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    className="mt-5 w-full black_btn"
                    type="button"
                    onClick={() => {
                      setToggle(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
  )
}

export default Nav