const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const button = contactForm.querySelector('button[type="submit"]');
    const status = document.querySelector('#form-status');
    button.disabled = true;
    button.textContent = 'SENDING…';
    status.textContent = '';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Delivery was not confirmed');
      status.textContent = 'Thank you — your message has been sent to Project Nirvana.';
      contactForm.reset();
    } catch {
      status.textContent = 'Delivery could not be confirmed. Your message is still here. Try again, or email projectnirvanaindia@gmail.com.';
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.innerHTML = 'SEND MESSAGE <span>↗</span>';
    }
  });
}
