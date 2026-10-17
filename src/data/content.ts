export const BRAND = 'Spotty Labs Technology'
export const CONTACT_EMAIL = 'hello@spottylabs.tech'

export type MediaCredit = {
  name: string
  href: string
}

export type MediaRef = {
  src: string
  alt: string
  credit: MediaCredit
}

export const HERO_IMAGE = {
  src: '/images/hero-craft.jpg',
  alt: 'Hands typing on a laptop with code on the screen',
  credit: {
    name: 'Rahul Mishra',
    href: 'https://unsplash.com/photos/Bn4L8oSTIjc',
  },
} as const satisfies MediaRef

export const ABOUT_IMAGE = {
  src: '/images/about-workshop.jpg',
  alt: 'Someone working at a laptop in a teaching workspace',
  credit: {
    name: 'Brooke Cagle',
    href: 'https://unsplash.com/photos/g1Kr4Ozfoac',
  },
} as const satisfies MediaRef

export const HERO = {
  headline: 'Build what’s next.',
  support:
    'Websites, custom apps, AI integrations, and computer education — from a lab named after a Dalmatian and a Labrador.',
  primaryCta: 'Get in touch',
  secondaryCta: 'View services',
} as const

export const HOME_TEASERS = [
  {
    id: 'services',
    title: 'Services',
    body: 'Websites, custom apps, AI, and teaching — four ways to build what’s next.',
    href: '/services',
    image: {
      src: '/images/teaser-services.jpg',
      alt: 'A person coding on a laptop at night',
      credit: {
        name: 'Chirayu Trivedi',
        href: 'https://unsplash.com/photos/M1yPeeHZ08w',
      },
    },
  },
  {
    id: 'about',
    title: 'About',
    body: 'Named after a Dalmatian and a Labrador. Pattern and loyalty, in software.',
    href: '/about',
    image: {
      src: '/images/teaser-about.jpg',
      alt: 'A person typing on a laptop in a dark room',
      credit: {
        name: 'Markus Spiske',
        href: 'https://unsplash.com/photos/iar-afB0QQw',
      },
    },
  },
  {
    id: 'contact',
    title: 'Contact',
    body: 'Tell us what you’re trying to make. We’ll write back.',
    href: '/contact',
    image: {
      src: '/images/teaser-contact.jpg',
      alt: 'A blank notebook and pen on a dark surface',
      credit: {
        name: 'Aaron Burden',
        href: 'https://unsplash.com/photos/pVWU-CSxqx0',
      },
    },
  },
] as const

export const MEDIA_CREDITS: readonly MediaCredit[] = [
  HERO_IMAGE.credit,
  ABOUT_IMAGE.credit,
  ...HOME_TEASERS.map((teaser) => teaser.image.credit),
].filter(
  (credit, index, credits) =>
    credits.findIndex((entry) => entry.href === credit.href) === index,
)

export const SERVICES_INTRO = 'What we make and teach. Four specialties, one lab.'

export const SERVICES = [
  {
    id: 'websites',
    title: 'Websites',
    description: 'Fast, distinctive sites that carry your brand.',
    blurb:
      'Fast, distinctive sites that carry your brand. Structure, type, and motion chosen so the first screen already feels like you — not a template with the logo swapped in.',
  },
  {
    id: 'custom-applications',
    title: 'Custom Applications',
    description: 'Software shaped around how you actually work.',
    blurb:
      'Software shaped around how you actually work. We map the real steps, then build the smallest tool that removes the friction — a dashboard, a booking flow, an internal app.',
  },
  {
    id: 'ai-integrations',
    title: 'AI Integrations',
    description: 'Practical AI wired into tools and workflows.',
    blurb:
      'Practical AI wired into tools and workflows. Not a chatbot bolted on the side: retrieval, drafting, and classification where they save time, with a human still in the loop.',
  },
  {
    id: 'computer-education',
    title: 'Computer Education',
    description: 'Clear teaching that turns curiosity into skill.',
    blurb:
      'Clear teaching that turns curiosity into skill. Lessons paced for the person in the room, from first principles to a project you can keep using.',
  },
] as const

export const ABOUT = {
  title: 'About the lab',
  paragraphs: [
    'Spotty Labs Technology is named after two dogs — a Dalmatian and a Labrador. One for pattern, one for loyalty. The name stuck because it described the work we wanted to do.',
    'Careful craft and modern tech belong together. We design and build websites, custom applications, and AI integrations that stay understandable after launch.',
    'Teaching is part of the same job. Computer education here means sitting with the problem until it is clear enough to pass on — so the skill stays with you, not with the lab.',
  ],
} as const

export const CONTACT_INTRO = {
  eyebrow: 'Start a conversation',
  title: 'What can we build together?',
  support: 'A short note is enough — name, email, and what you have in mind.',
} as const
