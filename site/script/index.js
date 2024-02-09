
class Validator {

  static validateEmail(email) {
      const re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return re.test(String(email).toLowerCase());
  }

 
  static validateName(name) {
      return name.length >= 2;
  }
}


class Modal {
  static open(selector) {
      $(selector).show();
  }

  
  static close(selector) {
      $(selector).hide();
  }
}


class Gallery {
  
  static loadNewDog() {
      fetch('https://dog.ceo/api/breeds/image/random')
          .then(response => response.json())
          .then(data => {
              let img = $('<img>', {src: data.message, alt: 'Happy Dog', class: 'dog-image-gallery'});
              $('#dogImagesContainer').append(img);
              
              $('#dogImagesContainer').scrollLeft($('#dogImagesContainer')[0].scrollWidth);
          })
          .catch(error => {
              console.error('Error fetching dog image:', error);
          });
  }
}

// Event handlers when the document is ready
$(document).ready(function() {
  // Call the routing handler initially
  handleRouting();

  // Event handler for closing modals
  $('.close').on('click', function() {
    Modal.close('#bookingModal');
    Modal.close('#successModal');
  });

  // Event handler for opening the booking modal
  $('.book-now-top, .book-now-main').on('click', function() {
    let email = $('header input[type="email"]').val();  
    $('#emailInput').val(email);  
    Modal.open('#bookingModal');
  });

  // Event handler for submitting the booking form
  $('#submitButton').on('click', function() {
    let nameValid = Validator.validateName($('#nameInput').val());
    let surnameValid = Validator.validateName($('#surnameInput').val());
    let emailValid = Validator.validateEmail($('#emailInput').val());

    // Show or hide tooltips based on validation
    $('#nameTooltip').toggle(!nameValid);
    $('#surnameTooltip').toggle(!surnameValid);
    $('#emailTooltip').toggle(!emailValid);
    $('#submitTooltip').toggle(!(nameValid && surnameValid && emailValid));

    // If all validations pass, close the booking modal and show the success modal
    if (nameValid && surnameValid && emailValid) {
      Modal.close('#bookingModal');
      Modal.open('#successModal');

      // Automatically close the success modal after 3 seconds
      setTimeout(function() {
        Modal.close('#successModal');
      }, 3000);
    }
  });

  // Event handler for showing the gallery section
  $("ul.menu li a:contains('About us')").on('click', function(e) {
    e.preventDefault();
    // Hide all main sections
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').hide();
    // Show the gallery section
    $('#dogGallery').show();
    // Load a new dog image
    Gallery.loadNewDog();
  });

  // Handlers for navigating through the gallery images
  $('#nextDog').on('click', function() {
    Gallery.loadNewDog();
  });

  $('#prevDog').on('click', function() {
    let images = $('#dogImagesContainer img');
    if (images.length > 1) {
      images.last().remove();
    }
  });

  // Handler for returning from the gallery to the main content
  $('#backToMain').on('click', function() {
    $('#dogGallery').hide();
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').show();
  });

  // Handler for toggling FAQ answers
  $('.faq-list li span:nth-child(2)').on('click', function() {
    $(this).next('.faq-answer').slideToggle();
    $(this).text($(this).text() === '+' ? '-' : '+');
  });

  // Handlers for showing the contact and service sections
  $("ul.menu li a:contains('Contact')").on('click', function(e) {
    e.preventDefault();
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section, #dogGallery').hide();
    $('#contactSection').show();
  });

  $('#backFromContact').on('click', function() {
    $('#contactSection').hide();
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').show();
  });

  $("ul.menu li a:contains('Service')").on('click', function(e) {
    e.preventDefault();
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section, #dogGallery').hide();
    $('#service').show();
  });

  $('#backFromservice').on('click', function() {
    $('#service').hide();
    $('.container, nav, header, .spa-treatment, .professional, .expect-care, .review-container, .faq-section').show();
  });

  // Event handler for routing based on URL hash changes
  $(window).on('hashchange', handleRouting);
});

// Function to handle client-side routing
function handleRouting() {
    // Hide all sections marked with the class 'page'
    $('.page').hide();
    
    // Get the current URL hash, defaulting to '#home' if none is present
    const hash = window.location.hash || '#home';
    
    // Show the section that corresponds to the current hash
    $(hash).show();
    
    // Update the navigation menu to reflect the current active section
    $('ul.menu li a').each(function() {
        $(this).parent().toggleClass('active', $(this).attr('href') === hash);
    });
}
