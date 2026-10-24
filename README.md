# leadev
# lea_ahouanse
# portfolio-lea_dev

## Contact form email delivery

The contact forms send messages to `lenaahouanse@gmail.com` through the Resend API. To enable delivery:

1. Create a Resend account and verify the domain used for the sender address.
2. Copy `.env.example` to `.env.local`.
3. Set `RESEND_API_KEY` to your Resend API key and `CONTACT_FROM_EMAIL` to an address on the verified domain. `CONTACT_TO_EMAIL` can be changed if messages should go to another inbox.
4. Add the same environment variables to the hosting provider before deploying.

Keep the API key server-side; do not add it to a `NEXT_PUBLIC_` variable or commit `.env.local`.
