import React from "react";

function SubNav({ children }: { children: React.ReactNode }) {
  return <div className="sub-nav nav btn-group btn-group-sm">{children}</div>;
}

export default React.memo(SubNav);
