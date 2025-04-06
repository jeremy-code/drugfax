import type { ReactNode } from "react";

import { Navbar } from "#components/layout/Navbar";
import { Footer } from "#components/layout/Footer";

const StaticLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container grid place-content-center py-4">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default StaticLayout;
