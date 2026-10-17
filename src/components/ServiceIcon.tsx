import type { ReactNode } from 'react'
import { SERVICES } from '../data/content'

type ServiceId = (typeof SERVICES)[number]['id']

const marks: Record<ServiceId, ReactNode> = {
  websites: (
    <>
      <rect x="3" y="7" width="13" height="10" rx="1.2" />
      <rect x="8" y="4" width="13" height="10" rx="1.2" />
    </>
  ),
  'custom-applications': (
    <>
      <rect x="3" y="5" width="18" height="3.2" rx="1.2" />
      <rect x="3" y="10.4" width="14" height="3.2" rx="1.2" />
      <rect x="3" y="15.8" width="10" height="3.2" rx="1.2" />
    </>
  ),
  'ai-integrations': (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <line x1="12" y1="4.5" x2="12" y2="9" />
      <line x1="5.2" y1="16.2" x2="9.6" y2="13.6" />
      <line x1="18.8" y1="16.2" x2="14.4" y2="13.6" />
    </>
  ),
  'computer-education': (
    <>
      <polyline points="8 9 12 6 16 9" />
      <line x1="7" y1="18" x2="17" y2="18" />
    </>
  ),
}

export function ServiceIcon({ name }: { name: ServiceId }) {
  return (
    <span className="services__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {marks[name]}
      </svg>
    </span>
  )
}
