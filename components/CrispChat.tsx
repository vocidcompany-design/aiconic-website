"use client";

import { useEffect } from "react";

export default function CrispChat() {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "6d85487e-0e84-42db-9dfe-6f76009b3b36";

    // Hide the native floating widget — we use our own embedded UI
    window.$crisp.push(["do", "chat:hide"]);

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
