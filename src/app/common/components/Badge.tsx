import React from "react";

const Badge = ({ color, children }: React.PropsWithChildren<{
  color:string,
}>) => (
  <span
    style={{
      color: "white",
      borderRadius: "0.7em",
      padding: "0.25em",
      paddingBottom: "0",
      fontWeight: "bold",
      background: color,
    }}
  >
    {children}
  </span>
);

export default Badge;
