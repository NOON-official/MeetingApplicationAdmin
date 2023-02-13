import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children?: ReactNode;
};

const BaseLayout = ({ children }: Props) => (
  <div>
    <Header />
    {children}
  </div>
);

export default BaseLayout;
