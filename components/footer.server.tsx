import { Footer } from "@/components/footer";
import pkg from "@/package.json";

export default function FooterServer() {
  return <Footer version={pkg.version} />;
}
