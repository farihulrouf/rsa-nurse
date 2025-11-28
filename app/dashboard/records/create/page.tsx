'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import CreateRecordComponent from "@/components/CreateRecordComponent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateRecordComponent />
    </Suspense>
  );
}
