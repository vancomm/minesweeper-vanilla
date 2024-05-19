/** @type {HTMLFormElement} */
const formElement = document.getElementById("play-form")

formElement.onsubmit = function(e) {
    e.preventDefault()
    const formData = new FormData(this)
    const params = new URLSearchParams(formData)
    console.log(params.toString())
    window.location.replace("play.html?" + params.toString())
}
