export const SITE_URL = "https://gabrielpimentel.pages.dev";

export const profile = {
  name: "Gabriel Pimentel",
  fullName: "Gabriel Henrique Ferreira Pimentel",
  email: "gabrielhfp96@gmail.com",
  phone: "5511953725013",
  phoneDisplay: "+55 (11) 9 5372-5013",
  location: "Santo André, SP",
  cv: "/curriculo.pdf",
  links: {
    github: "https://github.com/GroundWave96",
    linkedin: "https://www.linkedin.com/in/gabrielhfpimentel/",
  },
  current: {
    company: "Timenow",
    client: "Braskem",
  },
} as const;

/** WhatsApp link with a greeting prefilled in the visitor's language. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${profile.phone}?text=${encodeURIComponent(message)}`;
}
