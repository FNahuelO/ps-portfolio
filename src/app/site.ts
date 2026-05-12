/** Email y utilidades compartidas para CTAs y pie de página */
export const CONTACT_EMAIL = "priscilasarmiento.8@gmail.com";

export function mailtoSubject(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
