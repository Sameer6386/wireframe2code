"use client";
import Image from "next/image";
import Link from "next/link";
import Authentication from "./_components/Authentication";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
        <nav
          className="relative p-4 max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                className="w-[40px] h-[40px]"
              />
              <h2 className="font-bold text-lg">Wireframe2Code</h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
            {!user?.email ? (
              <Authentication>
                <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <Image
                    src="/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span>Sign in with Google</span>
                </div>
              </Authentication>
            ) : (
              <ProfileAvatar />
            )}
          </div>
        </nav>
      </header>

      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-200"
              href="https://tubeguruji.com"
              target="_blank"
            >
              TUBEGURUJI Membership - Join Now
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-neutral-700 dark:text-neutral-400">
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              Convert Wireframe
              <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                {" "}
                To Code
              </span>
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
              Revolutionize your content creation with our AI-powered app,
              delivering engaging and high-quality apps in seconds.
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            {user?.email ? (
              <Link
                className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
                href="/dashboard"
              >
                Get started
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ) : (
              <Authentication>
                <div className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800">
                  Get Started
                </div>
              </Authentication>
            )}
          </div>
        </div>
      </div>

      <div>
        <Image
          src="/Wireframetocode.png"
          alt="image"
          width={800}
          height={900}
          className="w-full h-[300px] object-contain"
        />
      </div>
    </div>
  );
}
