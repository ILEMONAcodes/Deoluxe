import { EmptyState } from "@/components/ui/empty-state";
export const metadata = { title: "You're offline" };
export default function Offline() { return <EmptyState title="You’re offline."><p>Saved pages still work. Reconnect to see what’s new.</p></EmptyState>; }
