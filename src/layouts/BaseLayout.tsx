import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const DynamicHeader = dynamic(() => import(`./Header`), {
  ssr: false,
});

const BaseLayout = ({ children }: Props) => (
  <div>
    <DynamicHeader />
    {children}
  </div>
);

export default BaseLayout;
