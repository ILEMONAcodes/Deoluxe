import { SelectionPreview } from "@/components/shop/selection-preview";
import { catalogue } from "@/server/catalogue-preview";
export const metadata = { title: "Your bag" };
export default function Cart() { return <SelectionPreview pieces={catalogue} />; }
