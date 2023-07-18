document.querySelector('.contact-container form').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const emailJSUserId = '';
  const emailJSServiceId = '';
  const emailJSTemplateId = '';

  emailjs.init(emailJSUserId);

  emailjs.send(emailJSServiceId, emailJSTemplateId, {
    name: name,
    email: email,
    message: message,
  })
  .then(function(response) {
    const responseMessage = document.createElement('p');
    responseMessage.textContent = `*Thank you, ${name}! Your message has been sent.`;
    responseMessage.id = 'responseMessage';

    responseMessage.style.marginTop = '350px';
    responseMessage.style.marginRight = '20px';

    const formContainer = document.querySelector('.contact-container');
    formContainer.appendChild(responseMessage);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
});
