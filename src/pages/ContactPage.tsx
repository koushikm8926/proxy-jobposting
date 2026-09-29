import React from 'react'
import { ContactHero } from '../components/contact/ContactHero'
import { ContactChannels } from '../components/contact/ContactChannels'
import { ContactFormAndOffice } from '../components/contact/ContactFormAndOffice'
import { Footer } from '../components/Footer'

export const ContactPage: React.FC = () => {
  return (
    <div className="contact-page animate-fade-in">
      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. 4 Channels Row: Call Us, Email Us, WhatsApp, Follow Us */}
      <ContactChannels />

      {/* 3. Send Us a Message Form & Our Office / Map Visual */}
      <ContactFormAndOffice />

      {/* 4. Sleek Dark Footer matching reference */}
      <Footer variant="dark" />
    </div>
  )
}
