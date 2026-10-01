import { useState } from 'react'
import { EMAIL, MIN_QUANTITY_KG, WHATSAPP_URL } from '../content'
import { ArrowIcon, CheckIcon } from './Icons'

// FormSubmit relays the form to the inbox without the visitor needing a mail app.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Buy gold',
    quantity: '',
    message: '',
  })

  const [quantityError, setQuantityError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleQuantityChange = (value) => {
    setFormData({ ...formData, quantity: value })
    const qty = parseFloat(value)
    if (value !== '' && qty < MIN_QUANTITY_KG) {
      setQuantityError(`Minimum order is ${MIN_QUANTITY_KG} kg`)
    } else {
      setQuantityError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const qty = parseFloat(formData.quantity)
    if (isNaN(qty) || qty < MIN_QUANTITY_KG) {
      setQuantityError(`Minimum order is ${MIN_QUANTITY_KG} kg`)
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Gold inquiry from ${formData.name}`,
          _template: 'table',
          _replyto: formData.email,
          Name: formData.name,
          Phone: formData.phone,
          Email: formData.email,
          Interest: formData.interest,
          Quantity: `${formData.quantity} kg`,
          Message: formData.message.trim() || 'Please contact me regarding my gold inquiry.',
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || String(result.success) === 'false') throw new Error(result.message || 'Send failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex h-full flex-col items-start justify-center py-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-gold-100 to-gold-300 text-gold-800">
          <CheckIcon className="h-6 w-6" />
        </span>
        <p className="eyebrow mt-8">Message sent</p>
        <h3 className="mt-5 font-display text-4xl text-ink">Thank you, {formData.name.split(' ')[0]}.</h3>
        <p className="mt-3 max-w-md text-sm leading-7 text-ink-soft">
          Your details have reached our team. We will reach out by call or email within 30 minutes.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="eyebrow">Private booking</p>
      <h3 className="mt-5 font-display text-4xl text-ink">Let us contact you</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-ink-soft">
        Share your details below and we will reach out by call or email within 30 minutes.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="field-label">Full name</label>
          <input
            id="booking-name"
            required
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="field"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="booking-phone" className="field-label">Phone</label>
          <input
            id="booking-phone"
            required
            type="tel"
            value={formData.phone}
            onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
            className="field"
            placeholder="Phone number"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="booking-email" className="field-label">Email</label>
          <input
            id="booking-email"
            required
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className="field"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="booking-interest" className="field-label">Interest</label>
          <select
            id="booking-interest"
            value={formData.interest}
            onChange={(event) => setFormData({ ...formData, interest: event.target.value })}
            className="field"
          >
            <option>Buy gold</option>
            <option>Smelting inquiry</option>
            <option>Private consultation</option>
          </select>
        </div>
        <div>
          <label htmlFor="booking-quantity" className="field-label">Quantity (kg)</label>
          <input
            id="booking-quantity"
            required
            type="number"
            min={MIN_QUANTITY_KG}
            step="0.1"
            value={formData.quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className={`field ${quantityError ? 'field-error' : ''}`}
            placeholder={`Min ${MIN_QUANTITY_KG} kg`}
          />
          {quantityError && <p className="mt-1.5 text-xs text-red-700">{quantityError}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="booking-message" className="field-label">
            Message <span className="font-medium tracking-normal normal-case text-ink-mute">(optional)</span>
          </label>
          <textarea
            id="booking-message"
            rows={4}
            maxLength={1000}
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            className="field min-h-28 resize-y leading-6"
            placeholder="Tell us about your gold, timelines, or any questions you have."
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`btn mt-2 w-full sm:col-span-2 ${status === 'sending' ? 'btn-disabled' : 'btn-gold'}`}
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
          {status !== 'sending' && <ArrowIcon className="h-4 w-4" />}
        </button>
        {status === 'error' && (
          <p className="text-sm text-red-700 sm:col-span-2" role="alert">
            We couldn't send your message just now. Please try again, or{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              chat with us on WhatsApp
            </a>
            .
          </p>
        )}
      </form>
    </div>
  )
}

export default BookingForm
