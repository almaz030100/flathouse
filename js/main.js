document.addEventListener("DOMContentLoaded", () => {

  const isMainPage = !!document.querySelector('#pageMain')

  // Fancybox settings
  {
    Fancybox.bind("[data-fancybox]", {
      autoFocus: false,
      dragToClose: false,
    })
  }


  // Form validation
  {
    $('form').each(function () {
      jQuery.validator.addMethod("checkMask", function (e, t) {
        return /.\d..\d{3}..\d{3}.\d{2}.\d{2}/g.test(e)
      })

      $(this).validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
            maxlength: 50
          },
          phone: {
            required: true,
            checkMask: true
          },
          email: {
            required: true,
            minlength: 2,
            maxlength: 50,
            email: true
          }
        },
      })
    })

    let elements = document.querySelectorAll('input[name="phone"]')
    let maskOptions = {
      mask: '+{7} (000) 000-00-00',
      lazy: false
    }
    elements.forEach(element => {
      element.addEventListener('focus', () => {
        let mask = IMask(element, maskOptions)
      })
    })
  }


  // Sliders
  if (isMainPage) {
    new Splide('.promo-splide', {
      type: 'loop',
      arrows: false,
      pagination: true,
      gap: '50px',
      mediaQuery: 'min',
      breakpoints: {
        576: {
          destroy: true
        }
      }
    }).mount()

  }

  // Аккордеоны
  if (isMainPage) {
    // new ItcAccordion('#accordion-1', {alwaysOpen: false})
    // new ItcAccordion('#accordion-2', {alwaysOpen: false})
  }

  // Устанавливаем текущий год в футере
  {
    let span = document.querySelectorAll('[data-year]')
    let year = new Date().getFullYear()
    span.forEach(item => {
      item.textContent = year.toString()
    })
  }
})


// Показываем модальное окно при уходе со страницы
window.addEventListener('load', () => {
  const isMainPage = !!document.querySelector('#pageMain')

  function t() {
    Fancybox.show(
      [
        {
          src: '#modal-5',
        },
      ],
      {
        autoFocus: false,
        dragToClose: false
      }
    )
  }

  function scriptModal(e) {
    if (e.clientY > document.documentElement.clientHeight / 2) {
      $(document).one("mouseleave", function (e) {
        $("#pageMain").length && e.clientY < 10 && t()
      })
      document.removeEventListener('mousemove', scriptModal)
    }
  }

  // if (isMainPage) {
  //   document.addEventListener('mousemove', scriptModal)
  // }
})