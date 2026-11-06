/**
 * A portfolio project. Display order is the array order in data.ts.
 *
 * Case-study sections are optional: a section only renders when it has
 * content, so a project can grow from a summary into a full write-up without
 * the page ever showing an empty heading.
 */
export interface Project {
  /** Legacy numeric id — old /projects/<id> links redirect to the slug. */
  id: number;
  slug: string;
  /** Featured projects get the large case-study cards; the rest are "Also built". */
  featured: boolean;
  title: string;
  /** Short name for tight spots: index rows, "Next project". */
  short: string;
  /** Upper-case label shown in the category chip. */
  category: string;
  year: string;
  client: string;
  image: string;
  /** One-paragraph pitch used on cards and the case-study intro. */
  summary: string;
  /** Longer overview; falls back to `summary` when absent. */
  overview?: string;
  role?: string;
  challenge?: string;
  approach?: string;
  features?: string[];
  decisions?: string;
  results?: string;
  technologies: string[];
  /** Hue (0–360) of the project's tinted panel behind its screenshots. */
  hue: number;
  /**
   * Guided tour of the product, one step per screen, shown as the
   * case-study walkthrough. Without it the page falls back to a plain gallery.
   */
  walkthrough?: WalkthroughStep[];
  /** Live URL. Omit when there is no healthy public deployment. */
  link?: string;
  repo?: string;
  gallery: string[];
}

export interface WalkthroughStep {
  src: string;
  title: string;
  text: string;
}

export interface ContactDetails {
  email: string;
  /** Digits only, country code included — the form wa.me expects. */
  whatsappNumber: string;
  whatsappLabel: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
