export type MailtoFields = {
  name: string
  email: string
  message: string
}

export function buildMailtoHref(to: string, fields: MailtoFields): string {
  const subject = `Spotty Labs inquiry from ${fields.name}`
  const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
  const params = new URLSearchParams({ subject, body })
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`
}
