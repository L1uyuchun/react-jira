import styled from "@emotion/styled";

// type paramsProps = {
//     justifyContent?: string,
//     marginRight?: number,
//     alignItems: string
// }
export const Row = styled.div<{
  justifyContent?: string | null;
  marginRight?: number | null;
  alignItems?: string | null;
}>`
  display: flex;
  justify-content: ${(props) =>
    props?.justifyContent ? props.justifyContent : "flex-start"};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : "flex-start"};
  > * {
    margin-right: ${(props) => (props.marginRight ? props.marginRight : 0)}px;
  }
`;
