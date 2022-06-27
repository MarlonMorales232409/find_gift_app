// Variables
const form = document.querySelector(".form");
const mainContent = document.getElementById("main");
// Loader Spinner
const loader = `<div class="lds-roller loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`





// Form submit event
const formSubmit = (event) => {

    event.preventDefault();
    const input = document.querySelector(".query_input");

    if (input.value) {
        // API Call
        getGif(input.value)

        form.reset()
    }

    return
}

// Submit Listener
form.addEventListener('submit', formSubmit);




/**
 * Create Events Listener for copy link Dynamic buttons
 * @returns {void}
 */
const createEvents = () => {
    const copyButton = document.querySelectorAll(".copy_link");

    copyButton.forEach(button => {

        button.addEventListener("click", () => {
            // Get the URL from img wrapper element
            const imgUrl = document.querySelector('.gif_img_wrapper').getAttribute("data_url");

            // Using clipboard API to copy the img url
            navigator.clipboard.writeText(imgUrl)
                .then(() => Swal.fire({
                    title: 'Great!',
                    text: 'The URL has been copied to the clipboard',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }))
                .catch(() => Swal.fire({
                    title: 'Great!',
                    text: 'The URL could not be copied to the clipboard',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }))
        })
    })
}


/**
 * // Create a dinamyc UI itering over the "data" array get it from parameters
 * @param {string[]} data Array with all gifs information
 * @returns {void}
 */

const buildHTML = (data) => {

    let itemsHtml = ""

    data.forEach(element => {
        itemsHtml += ` 
        <article class="gif_card">
            <div class="gif_img_wrapper" data_url="${element.url}">
                <img src="${element.images.original.url}" alt="gif" class="gif_img" ">
            </div>
            <div class="title_wrapper">
                <p class="title">${element.title}</p>
            </div>
            <div class="share_button_wrapper">
                <button class="share_buttons copy_link hvr-pulse-shrink">
                    <img src="./icons/link-45deg.svg" alt="link" class="share_button_icon icon">
                </button>
                <a href="https://api.whatsapp.com/send?text=${element.url}" target="_blank" class="share_buttons share_whatsapp hvr-pulse-shrink">
                    <img src="./icons/whatsapp.svg" alt="whatsapp" class="share_button_icon icon">
                </a>
                <a href="tg://msg_url?url=${element.url}" target="_blank" class="share_buttons share_telegram hvr-pulse-shrink">
                    <img src="./icons/telegram.svg" alt="" class="share_button_icon icon">
                </a>
                <a href="https://twitter.com/intent/tweet?text=${element.url}" target="_blank" class="share_buttons share_twitter hvr-pulse-shrink">
                    <img src="./icons/twitter.svg" alt="twitter" class="share_button_icon icon">
                </a>
            </div>
        </article>
    `})

    // Insert the new UI in the DOM
    mainContent.innerHTML = itemsHtml;

    // Create the event listener for copy to clipboard button
    createEvents()
}

/**
 * Check if the data array is empty
 * @param {string[]} gifs gifs array from api response
 * @returns {void}
 */
const checkApiResults = (gifs) => {
    console.log(gifs.data)
    if (gifs.data.length < 1) {
        Swal.fire({
            title: 'No Results',
            text: 'try looking for something else like "kitties"',
            icon: 'info',
            confirmButtonText: 'Ok'
        })

        getGif("red pandas")
    }
}


/**
 * API Call
 * @param {string} query user query to find the new gifs, by default "red pandas"
 * @returns {void}
 */
const getGif = async (query = "red pandas") => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=s78EhL8E0LubTAuzIRLXkoD6rpFDAaob&limit=10&q=${query}`;

    // Show a Loader when the App is making a request
    mainContent.innerHTML = loader;

    // Async Await
    try {
        const res = await fetch(url);
        const gifs = await res.json();
        checkApiResults(gifs)
        // Function to build a dynamic UI 
        buildHTML(gifs.data)
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Please, Check your Internet conection',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    // Remove the Loader, if it's in the dom 
    if (document.querySelector('.loader')) {
        document.querySelector('.loader').remove()

    }
}

// Make the first API call when the app is initializing
window.onload = getGif();


