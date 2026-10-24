const recipient = process.env.CONTACT_TO_EMAIL ?? 'lenaahouanse@gmail.com'

type ContactMessage = {
  name: string
  email: string
  message: string
}

function isContactMessage(value: unknown): value is ContactMessage {
  if (typeof value !== 'object' || value === null) return false

  const message = value as Record<string, unknown>
  return (
    typeof message.name === 'string' &&
    typeof message.email === 'string' &&
    typeof message.message === 'string'
  )
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[character]
  })
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!isContactMessage(payload)) {
    return Response.json({ error: 'Please complete all required fields.' }, { status: 400 })
  }

  const name = payload.name.trim()
  const email = payload.email.trim()
  const message = payload.message.trim()

  if (
    !name ||
    name.length > 120 ||
    /[\r\n]/.test(name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    /[\r\n]/.test(email) ||
    !message ||
    message.length > 5000
  ) {
    return Response.json({ error: 'Please check the contact form fields.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !from) {
    console.error('Contact email is not configured: RESEND_API_KEY and CONTACT_FROM_EMAIL are required.')
    return Response.json({ error: 'Contact email is temporarily unavailable.' }, { status: 503 })
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Nouveau message du portfolio — ${name}`,
        text: `Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}`,
        html: `<p><strong>Nom :</strong> ${safeName}</p><p><strong>E-mail :</strong> ${safeEmail}</p><p><strong>Message :</strong><br>${safeMessage}</p>`,
      }),
    })

    if (!response.ok) {
      console.error(`Resend rejected the contact email with status ${response.status}.`)
      return Response.json({ error: 'The message could not be sent. Please try again later.' }, { status: 502 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Failed to send contact email through Resend.', error)
    return Response.json({ error: 'The message could not be sent. Please try again later.' }, { status: 502 })
  }
}
