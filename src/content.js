import { CompassIcon, FlameIcon, FlaskIcon, ShieldIcon, BadgeCheckIcon, ClockIcon, TagIcon } from './components/Icons'

// Booking form submissions go here; not displayed anywhere on the site.
export const EMAIL = 'rawgoldrefiners@gmail.com'
export const WHATSAPP_URL = 'https://wa.me/+254780396250'
export const MIN_QUANTITY_KG = 10

export const NAV_LINKS = [
  { href: '#collections', label: 'What We Offer' },
  { href: '#smelting', label: 'Smelting' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export const OFFERINGS = [
  {
    title: 'Smelting & Refining',
    description: 'Industrial scale gold smelting at $100/kg. We refine scrap, doré bars, and alluvial gold into certified pure bullion.',
    badge: 'For miners & traders',
    icon: FlameIcon,
  },
  {
    title: 'Gold Refining Consultancy',
    description: 'Strategic advisory for investors, miners, and traders seeking refinery partnerships, process guidance, and compliant gold recovery solutions.',
    badge: 'For investors',
    icon: CompassIcon,
  },
  {
    title: 'Testing Facility',
    description: 'In-house assay lab with precision XRF and fire assay testing. We verify purity and weight before every transaction, with certified results issued on the spot.',
    badge: 'For verified purity',
    icon: FlaskIcon,
  },
  {
    title: 'Storage Facility',
    description: 'Secure, insured vault storage for bullion and bars. Climate-controlled, monitored around the clock, with flexible short and long-term holding options.',
    badge: 'For secure holding',
    icon: ShieldIcon,
  },
]

export const PILLARS = [
  {
    title: 'Certified on the spot',
    text: 'Precision XRF and fire assay results issued before every transaction.',
    icon: BadgeCheckIcon,
  },
  {
    title: 'Insured vault storage',
    text: 'Climate-controlled holding, monitored around the clock.',
    icon: ShieldIcon,
  },
  {
    title: 'Answers in 30 minutes',
    text: 'Pricing and logistics details, delivered fast.',
    icon: ClockIcon,
  },
  {
    title: 'Transparent pricing',
    text: 'Industrial smelting at a flat $100 per kilogram.',
    icon: TagIcon,
  },
]

export const STEPS = [
  { title: 'Share your requirements', text: 'Tell us the quantity and form of gold you need.' },
  { title: 'Receive your quote', text: 'Receive pricing and logistics details within 30 minutes.' },
  { title: 'Confirm & deliver', text: 'Confirm your order and schedule delivery or pickup.' },
]

export const METRICS = [
  { value: 1.2, decimals: 1, suffix: 'k+', label: 'Verified clients' },
  { value: 30, prefix: '< ', suffix: ' min', label: 'Response time' },
  { value: 24, suffix: '/7', label: 'Premium access' },
]
