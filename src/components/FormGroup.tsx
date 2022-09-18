import React from "react";

type PropsType = {
  children: React.ReactNode;
};

export default function FormGroup({ children }: PropsType) {
  return <div className="form-group">{children}</div>;
}
