import React from "react";

type PropsType = {
  children: React.ReactNode;
};

export default function FormActions({ children }: PropsType) {
  return <div className="form-actions">{children}</div>;
}
