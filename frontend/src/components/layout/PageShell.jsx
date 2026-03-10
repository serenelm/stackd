import React from "react";

function PageShell({ children }) {
  return (
    <div className="stackd-shell">
      <div className="stackd-bg-accent" />
      <div className="stackd-shell-inner">{children}</div>
    </div>
  );
}

export default PageShell;