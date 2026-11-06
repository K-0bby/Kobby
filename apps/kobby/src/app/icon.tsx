import { markImage } from "@/lib/mark-image";

// Browser-tab favicon: the nav's GH mark.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return markImage(size.width);
}
