

(function($) {
    "use strict";

    // Page Loading
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.querySelector('.page-loading');
        if (preloader) {
            function removePreloader() {
                preloader.classList.remove('active');
                setTimeout(function() {
                    preloader.remove();
                }, 1500);
            }
            removePreloader();
        }
    });
    
    // Count Down Date
    document.addEventListener("DOMContentLoaded", function() {
        var daysElement = document.getElementById("days");
        var hoursElement = document.getElementById("hours");
        var minutesElement = document.getElementById("minutes");
        var secondsElement = document.getElementById("seconds");
        var countdownElement = document.getElementById("countdown");
    
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement || !countdownElement) {
            return;
        }
    
        var countDownDate = new Date("Jan 1, 2025 00:00:00").getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            daysElement.innerHTML = days;
            hoursElement.innerHTML = hours;
            minutesElement.innerHTML = minutes;
            secondsElement.innerHTML = seconds;
    
            if (distance < 0) {
                clearInterval(x);
                countdownElement.innerHTML = "EXPIRED";
            }
        }, 1000);
    });

    // Back To Top
    var backButton = document.createElement("button");
    backButton.id = "back-to-top";
    backButton.title = "Go to top";
    backButton.textContent = "Top";
    document.body.appendChild(backButton);
    window.onscroll = function() {
        scrollFunction();
    };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backButton.style.display = "block";
        } else {
            backButton.style.display = "none";
        }
    }
    backButton.onclick = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    // AOS Animation
    AOS.init();
    AOS.refresh();

    // Quantity Button
    document.addEventListener('DOMContentLoaded', function() {
        const productRows = document.querySelectorAll('.product-row');
        productRows.forEach(function(row) {
            const quantityInput = row.querySelector('.quantity-input');
            const decrementBtn = row.querySelector('.decrement-btn');
            const incrementBtn = row.querySelector('.increment-btn');
            decrementBtn.addEventListener('click', function() {
                decrementQuantity(quantityInput);
            });
            incrementBtn.addEventListener('click', function() {
                incrementQuantity(quantityInput);
            });
        });

        function decrementQuantity(input) {
            let currentQuantity = parseInt(input.value, 10);
            if (currentQuantity > 1) {
                input.value = currentQuantity - 1;
            }
        }

        function incrementQuantity(input) {
            let currentQuantity = parseInt(input.value, 10);
            input.value = currentQuantity + 1;
        }
    });

    // Initialize Razorpay
    const rzpKey = 'rzp_live_jigYFgc6PnZFmK'; // Your Razorpay Key ID
    
    // Common function to handle donations
    function handleDonation(amount, description) {
      if (!amount || amount < 10) {
        alert('Please enter a valid amount (minimum ₹10)');
        return;
      }
      
      const options = {
        key: rzpKey,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Nutrition Addition Program',
        description: description,
        image: 'img/rayan/bg.png',
        handler: function(response) {
          alert('Thank you for your donation! Payment ID: ' + response.razorpay_payment_id);
          // Here you can add code to send the payment details to your server
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#3498db'
        }
      };
      
      const rzp1 = new Razorpay(options);
      rzp1.open();
    }
    
    // Set up General Donation
    document.getElementById('general-donate-btn').addEventListener('click', function() {
      const customAmount = document.getElementById('general-amount').value;
      const amount = customAmount || 100; // Default to ₹100 if no custom amount
      handleDonation(amount, 'General Donation');
    });
    
    // Set up NAP Monthly Donation
    document.getElementById('nap-monthly-donate-btn').addEventListener('click', function() {
      const customAmount = document.getElementById('nap-monthly-amount').value;
      const amount = customAmount || 1000; // Default to ₹1000 if no custom amount
      handleDonation(amount, 'Monthly Child Sponsorship (₹1000/month)');
    });
    
    // Set up NAP Yearly Donation
    document.getElementById('nap-yearly-donate-btn').addEventListener('click', function() {
      const customAmount = document.getElementById('nap-yearly-amount').value;
      const amount = customAmount || 12000; // Default to ₹12000 if no custom amount
      handleDonation(amount, 'Yearly Child Sponsorship (₹12000/year)');
    });
    
    // Set up amount buttons for all cards
    document.querySelectorAll('.amount-option').forEach(option => {
      option.addEventListener('click', function() {
        // Remove selected class from all buttons in this card
        this.parentElement.querySelectorAll('.amount-option').forEach(btn => {
          btn.classList.remove('amount-option--selected');
        });
        
        // Add selected class to clicked button
        this.classList.add('amount-option--selected');
        
        // Set the amount in the corresponding input field
        const card = this.closest('.donation-card');
        const inputField = card.querySelector('.custom-amount-input');
        inputField.value = this.getAttribute('data-amount');
      });
    });


})(window.jQuery);