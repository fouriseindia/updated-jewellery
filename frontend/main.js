(function ($) {
  "use strict";

  new WOW().init();

  //navbar cart
  $(".cart_link > a").on("click", function () {
    $(".mini_cart").addClass("active");
  });

  $(".mini_cart_close > a").on("click", function () {
    $(".mini_cart").removeClass("active");
  });

  //sticky navbar
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $(".sticky-header").removeClass("sticky");
    } else {
      $(".sticky-header").addClass("sticky");
    }
  });

  // background image
  function dataBackgroundImage() {
    $("[data-bgimg]").each(function () {
      var bgImgUrl = $(this).data("bgimg");
      $(this).css({
        "background-image": "url(" + bgImgUrl + ")", // concatenation
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            var content = this.querySelector('.content');
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});

  $(window).on("load", function () {
    dataBackgroundImage();
  });

  //for carousel slider of the slider section
  $(".slider_area").owlCarousel({
    animateOut: "fadeOut",
    autoplay: true,
    loop: true,
    nav: false,
    autoplayTimeout: 6000,
    items: 1,
    dots: true,
  });

  //product column responsive
  $(".product_column3").slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: true,
    rows: 2,
    prevArrow:
      '<button class="prev_arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow:
      '<button class="next_arrow"><i class="ion-chevron-right"></i></button>',
    responsive: [
      {
        breakpoints: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoints: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoints: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoints: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  });

  //for tooltip
  $('[data-toggle="tooltip"]').tooltip();

  //tooltip active
  $(".action_links ul li a, .quick_button a").tooltip({
    animated: "fade",
    placement: "top",
    container: "body",
  });

  //product row activation responsive
  $(".product_row1").slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: true,
    prevArrow:
      '<button class="prev_arrow"><i class="ion-chevron-left"></i></button>',
    nextArrow:
      '<button class="next_arrow"><i class="ion-chevron-right"></i></button>',
    responsive: [
      {
        breakpoints: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoints: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoints: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoints: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  });

  // blog section
  $(".blog_column3").owlCarousel({
    autoplay: true,
    loop: true,
    nav: true,
    autoplayTimeout: 5000,
    items: 3,
    dots: false,
    margin: 30,
    navText: [
      '<i class="ion-chevron-left"></i>',
      '<i class="ion-chevron-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  //navactive responsive
  $(".product_navactive").owlCarousel({
    autoplay: false,
    loop: true,
    nav: true,
    items: 4,
    dots: false,
    navText: [
      '<i class="ion-chevron-left arrow-left"></i>',
      '<i class="ion-chevron-right arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      250: {
        items: 2,
      },
      480: {
        items: 3,
      },
      768: {
        items: 4,
      },
    },
  });

  $(".modal").on("shown.bs.modal", function (e) {
    $(".product_navactive").resize();
  });

  $(".product_navactive a").on("click", function (e) {
    e.preventDefault();
    var $href = $(this).attr("href");
    $(".product_navactive a").removeClass("active");
    $(this).addClass("active");
    $(".product-details-large .tab-pane").removeClass("active show");
    $(".product-details-large " + $href).addClass("active show");
  });
})(jQuery);

/***********slider***********************/
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 1000); // Change image every 2 seconds
}

document.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/*****************************************/
/************************women horizontal scroll****************** */
document.querySelector('.horizontal-scroll-wrapper').addEventListener('wheel', (event) => {
  if (event.deltaY !== 0) {
    event.preventDefault();
    document.querySelector('.horizontal-scroll-wrapper').scrollLeft += event.deltaY;
  }
});
/********************************************************************/
/********************for other category ************************ */
document.addEventListener('DOMContentLoaded', () => {
  // Get all menu toggles
  const menuToggles = document.querySelectorAll('.menu-toggle');

  menuToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default anchor behavior
          e.stopPropagation(); // Prevent click from bubbling up

          // Get the submenu associated with this toggle
          const submenu = toggle.nextElementSibling;

          // Toggle the 'show-menu' class
          submenu.classList.toggle('show-menu');
      });
  });

  // Hide all submenus when clicking outside
  document.addEventListener('click', () => {
      document.querySelectorAll('.submenu-inline').forEach(menu => {
          menu.classList.remove('show-menu');
      });
  });

  // Prevent closing the menu when clicking inside the menu
  document.querySelectorAll('.submenu-inline').forEach(menu => {
      menu.addEventListener('click', (e) => {
          e.stopPropagation();
      });
  });
});

/****************************************************** */

$(document).ready(function () {
  // Filter function on dropdown item click
  $('.dropdown-menu a.dropdown-item').on('click', function (e) {
      e.preventDefault();
      var filterValue = $(this).data('filter');
      applyFilter(filterValue);
  });

  // Function to apply filter (replace with your actual filter logic)
  function applyFilter(filterValue) {
      // Example: Log the filter value
      console.log('Applying filter for:', filterValue);
      // Implement your filtering logic here
      // Example: Show/hide items based on the filter value
      // Replace this with your actual implementation
      $('.main_content .item').hide(); // Hide all items
      $('.' + filterValue).show(); // Show items matching the filter value
  }
});
/**************************** */
/******************************card show more result****************************/
document.addEventListener('DOMContentLoaded', () => {
  const showMoreBtn = document.getElementById('show-more-btn');
  const rows = document.querySelectorAll('.row');
  let isShowingMore = false;

  // Initially hide rows beyond the first two
  for (let i = 2; i < rows.length; i++) {
      rows[i].classList.add('hidden');
  }

  showMoreBtn.addEventListener('click', () => {
      if (isShowingMore) {
          // Hide rows beyond the first two
          for (let i = 2; i < rows.length; i++) {
              rows[i].classList.add('hidden');
          }
          showMoreBtn.textContent = 'Show More';
      } else {
          // Show all rows
          for (let i = 2; i < rows.length; i++) {
              rows[i].classList.remove('hidden');
          }
          showMoreBtn.textContent = 'Show Less';
      }
      isShowingMore = !isShowingMore;
  });
});


/************************************************************************ */
/********************cart images ******************** */
function changeImage(imagePath) {
  document.getElementById('image1').src = imagePath;
}

function toggleWishlist(element) {
  element.classList.toggle('red');
  showNotification('Product added to wishlist successfully!');
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
      notification.style.display = 'none';
  }, 3000); // Hide notification after 3 seconds
}

document.getElementById('showMoreBtn').addEventListener('click', function() {
  var row3 = document.getElementById('row3');
  if (row3.style.display === 'none') {
      row3.style.display = 'flex'; // Or 'block' if you prefer
      this.textContent = 'Show Less'; // Change button text
  } else {
      row3.style.display = 'none';
      this.textContent = 'Show More';
  }
});

function toggleWishlist(event, element) {
  event.stopPropagation();
  element.classList.toggle('red');
}


/***************************Product detail ******************************** */

function toggleAccordionContent(contentId) {
  var content = document.getElementById(contentId);
  if (content.classList.contains('show')) {
      content.classList.remove('show');
  } else {
      content.classList.add('show');
  }
}

function changeImage(imageSrc) {
  const mainImageContainer = document.getElementById('mainImageContainer');
  mainImageContainer.innerHTML = `
      <img id="mainImage" src="${imageSrc}" class="img-fluid" alt="Main Image">
  `;
}

function changeVideo(videoSrc) {
  const mainImageContainer = document.getElementById('mainImageContainer');
  mainImageContainer.innerHTML = `
      <video controls class="w-100">
          <source src="${videoSrc}" type="video/mp4">
          Your browser does not support the video tag.
      </video>
  `;
}

function copyCoupon(couponText) {
  // Create a temporary textarea element to copy the text
  const tempInput = document.createElement('textarea');
  tempInput.value = couponText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  // Show the copied message
  const copiedMessageId = `copiedMessage${Array.from(document.querySelectorAll('.special-offer-box')).findIndex(box => box.innerText.includes(couponText)) + 1}`;
  const copiedMessage = document.getElementById(copiedMessageId);
  copiedMessage.style.display = 'block';
  setTimeout(() => {
      copiedMessage.style.display = 'none';
  }, 2000); // Hide the message after 2 seconds
}




/******************************************************************************************/


  function openNav() {
    document.getElementById("sidebar").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("sidebar").style.width = "0";
  }
  
  // Dropdown toggle functionality
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;
  
  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
  }
  
  
document.addEventListener('DOMContentLoaded', function() {
  var items = document.querySelectorAll('.instagram__item.set-bg');
  items.forEach(function(item) {
    var bgImg = item.getAttribute('data-bgimg');
    if (bgImg) {
      item.style.backgroundImage = 'url(' + bgImg + ')';
    }
  });
});

