import contactCrucible from '../assets/contact-crucible.jpg'
import BookingForm from './BookingForm'
import Reveal from './Reveal'

function Contact() {
  return (
    <section id="contact" className="px-3 pb-24 sm:px-5 sm:pb-32">
      <Reveal
        variant="scale"
        className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_100px_-50px_rgba(28,25,19,0.35)] ring-1 ring-ink/5 sm:rounded-[2.5rem]"
      >
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/10] lg:aspect-auto">
            <img
              src={contactCrucible}
              alt="Gold grains being melted in a ceramic crucible under a torch flame"
              className="ken-burns absolute inset-0 h-full w-full object-cover object-[50%_55%]"
              loading="lazy"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
            <div aria-hidden="true" className="photo-sheen absolute inset-0" />
            <div aria-hidden="true" className="absolute inset-3 rounded-[1.5rem] border border-white/15 sm:inset-4" />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
              <p className="text-[0.62rem] font-bold tracking-[0.3em] text-gold-200 uppercase">In the furnace</p>
              <p className="mt-2 font-display text-2xl leading-tight text-white italic sm:text-3xl">
                Smelted to your specification.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-14">
            <BookingForm />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default Contact
