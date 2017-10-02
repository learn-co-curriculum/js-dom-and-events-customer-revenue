function preventRefreshOnSubmit(){
    let forms = document.querySelectorAll('form')
    forms.forEach(function(form){
      form.addEventListener('submit', function(event){
        event.preventDefault()
      })
    })
}
