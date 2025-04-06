import { Button } from "@drugfax/ui/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="relative mx-auto max-w-5xl">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          {"Get the most useful information about "}
          <mark className="bg-gradient-to-tr from-primary-400 to-primary-600 bg-clip-text text-transparent">
            drugs
          </mark>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
          Get FDA-approved drug information, including indications, side
          effects, and more.
        </p>
        <div className="mt-6 flex justify-center space-x-6 text-sm sm:mt-10">
          <Link href="/drugs/search">
            <Button>Learn more</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
