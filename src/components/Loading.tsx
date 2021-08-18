import styled from "@emotion/styled";
import { ReactNode } from "react";

export const FullPageWraper = ({ children }: { children: ReactNode }) => {
  return <PageContainer>{children}</PageContainer>;
};
const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;
