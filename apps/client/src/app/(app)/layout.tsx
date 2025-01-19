import type { ReactNode } from "react";

import { Navbar } from "#components/layout/Navbar";
import { Footer } from "#components/layout/Footer";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
