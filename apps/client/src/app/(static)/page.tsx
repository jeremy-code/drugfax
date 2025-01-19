import { Button } from "@reclaim/ui/components/ui/button";
import { Checkbox } from "@reclaim/ui/components/ui/checkbox";

const Home = () => {
  return (
    <>
      <div className="relative mx-auto max-w-5xl pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          <mark className="bg-gradient-to-tr from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Defend
          </mark>
          {" yourself against insurance denials with AI"}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
          We help you appeal your insurance denials with our AI-powered
          platform.
        </p>
        <div className="mt-6 flex justify-center space-x-6 text-sm sm:mt-10">
          <Button>Start Your Appeal</Button>
        </div>
      </div>
      <div>
        In 2023, approximentally 23.21% of preauthorization claims were denied.
        Of those, 0.16% were appealed. However, of those appeals filed, 40.35%
        were overturned in favor of the patient.
      </div>
      <div>
        <Checkbox />
      </div>
    </>
  );
};

export default Home;
