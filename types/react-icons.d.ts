// Augment react-icons/si with missing icon types
// These icons exist at runtime but are missing from the bundled .d.ts
import type { IconType } from "react-icons";

declare module "react-icons/si" {
  export const SiX: IconType;
  export const SiLinkedin: IconType;
  export const SiLeetcode: IconType;
  export const SiKaggle: IconType;
  export const SiPinterest: IconType;
  export const SiBuymeacoffee: IconType;
  export const SiCaldotcom: IconType;
  export const SiCodeberg: IconType;
  export const SiGitlab: IconType;
  export const SiBehance: IconType;
}
