import { useEffect } from "react";

export function useTitle(title: String) {
  useEffect(() => {
    document.title = title + (title.match(/WWWTech/) ? "" : " – WWWTech");
  }, [title]);
}
