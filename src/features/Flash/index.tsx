import { useAppSelector } from "@/hooks";

import FlashMessage from "./FlashMessage";
import { selectFlash } from "./flashSlice";

export default function Flash() {
  const { messages } = useAppSelector(selectFlash);

  if (!messages.length) {
    return null;
  }

  return (
    <div className="flash-message-list">
      {messages.map((msg) => (
        <FlashMessage key={msg.id} flash={msg} />
      ))}
    </div>
  );
}
