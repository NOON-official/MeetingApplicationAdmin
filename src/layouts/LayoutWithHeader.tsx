import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const DynamicHeader = dynamic(() => import(`./Header`), {
  ssr: false,
});

const LayoutWithHeader = ({ children }: Props) => (
  <div>
    <DynamicHeader />
    {children}
  </div>
);

export default LayoutWithHeader;
