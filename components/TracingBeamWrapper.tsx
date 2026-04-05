"use client";

import { TracingBeam } from "@/components/ui/tracing-beam";

export default function TracingBeamWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TracingBeam>{children}</TracingBeam>;
}
