"use client";

import { useEffect } from "react";

export function PendoInitializer() {
  useEffect(() => {
    pendo.initialize({
      visitor: {
        id: '',
      },
      sessionReplay: {
        masterStoreSampleRate: 100,
        sampleRate: 100,
      },
    });
  }, []);

  return null;
}
