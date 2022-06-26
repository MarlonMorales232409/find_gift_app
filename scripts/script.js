// Elements
const form = document.querySelector(".form");
const mainContent = document.getElementById("main");
// Loader Spinner
const loader = `<div class="lds-roller loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`


// Function Submit
const formSubmit = (event) => {
    event.preventDefault();
    const input = document.querySelector(".query_input");

    // API Call
    getGift(input.value)

}

// Submit Listener
form.addEventListener('submit', formSubmit);



// Create Events Listener for copy link Dynamic buttons
const createEvents = () => {
    const copyButton = document.querySelectorAll(".copy_link");

    copyButton.forEach(button => {
        button.addEventListener("click", () => {
            // Get the URL from img wrapper element
            const imgUrl = document.querySelector('.gift_img_wrapper').getAttribute("data_url");

            // Using clipboard API to copy the img url
            navigator.clipboard.writeText(imgUrl)
                .then((copi) => alert('URL has been copied to the clipboard'))
                .catch((error) => alert('We could not copy to the clipboard'))
        })
    })
}

// Build Gift HTML
const buildHTML = (data) => {

    let itemsHtml = ""

    // Create a dinamyc UI itering over the "data" array get it from parameters
    data.forEach(element => {
        itemsHtml += ` 
        <article class="gift_card">
            <div class="gift_img_wrapper" data_url="${element.url}">
                <img src="${element.images.original.url}" alt="gift" class="gift_img" ">
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



// Call API Function
const getGift = async (query) => {
    // Show a Loader when the App is making a request
    mainContent.innerHTML = loader;

    const url = `https://api.giphy.com/v1/gifs/search?api_key=s78EhL8E0LubTAuzIRLXkoD6rpFDAaob&q=${query}&limit=10`
    // Async Await
    const res = await fetch(url);
    const gift = await res.json();
    // Function to build a dynamic UI 
    buildHTML(gift.data)

    // Remove the Loader, if it's in the dom 
    if (document.querySelector('.loader')) {
        document.querySelector('.loader').remove()

    }

}


