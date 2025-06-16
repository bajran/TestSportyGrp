import React from "react";

export interface Props {
  expr: boolean | (() => boolean);
  children?: React.ReactNode;
}

export const IF: React.FC<Props> = (props) => {
  const { expr } = props;

  const condition = typeof expr === "function" ? expr() : expr;
  return condition ? <>{props.children}</> : null;
};
