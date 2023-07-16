document.querySelector('contact-container form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Replace "YOUR_EMAILJS_USER_ID", "YOUR_EMAILJS_SERVICE_ID", and "YOUR_EMAILJS_TEMPLATE_ID" with your actual values.
    const emailJSUserId = 'YOUR_EMAILJS_USER_ID';
    const emailJSServiceId = 'YOUR_EMAILJS_SERVICE_ID';
    const emailJSTemplateId = 'YOUR_EMAILJS_TEMPLATE_ID';
  
    // Initialize EmailJS with your User ID
    emailjs.init(emailJSUserId);
  
    // Send the email using the EmailJS API
    emailjs.send(emailJSServiceId, emailJSTemplateId, {
      name: name,
      email: email,
      message: message,
    })
    .then(function(response) {
      const responseMessage = document.createElement('p');
      responseMessage.textContent = `Thank you, ${name}! Your message has been submitted.`;
      responseMessage.id = 'responseMessage';
  
      const formContainer = document.querySelector('.contact-container');
      formContainer.appendChild(responseMessage);
  
      // Clear form fields
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  });