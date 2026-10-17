export const BRAND = 'Spotty Labs Technology'
export const CONTACT_EMAIL = 'hello@spottylabs.tech'

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
  },
  {
    id: 'about',
    title: 'About',
    body: 'Named after a Dalmatian and a Labrador. Pattern and loyalty, in software.',
    href: '/about',
  },
  {
    id: 'contact',
    title: 'Contact',
    body: 'Tell us what you’re trying to make. We’ll write back.',
    href: '/contact',
  },
] as const

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
  body: 'Spotty Labs Technology is named after two dogs — a Dalmatian and a Labrador. That mix of pattern and loyalty shows up in the work: careful craft, modern tech, and teaching that sticks.',
} as const
