const textDisplay = document.querySelector('.text_display');
var chatInput = document.getElementById("chat-input");
var chatBlocks = document.querySelectorAll('.chatblock');

const chatMessage = (message) => `
<div class = "message blue-bg">
    <div class = "message-sender"> User </div>
    <div class = "message-text"> ${message} </div>
</div>
`

chatInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        const detected_input = chatInput.value.trim();

        if( detected_input.trim() != "" ){
            textDisplay.innerHTML += chatMessage(detected_input);
            chatInput.value = "";
        }
    }
});

const loadTextDisplay = () => {
    textDisplay.innerHTML = "";
};

chatBlocks.forEach(chatBlock => {
    chatBlock.addEventListener('click', () => {
        chatBlocks.forEach(block => {
            block.classList.remove('active');
        });
        chatBlock.classList.add('active');
        loadTextDisplay();
    });
});
