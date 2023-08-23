import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const BaseLayout = ({ children }: Props) => <div>{children}</div>;

export default BaseLayout;
