const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
//API--> { f8ddbf81dffe4c1b8ed1c2fa946e8d60 }

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellME(joke) {
     VoiceRSS.speech({
        key: 'f8ddbf81dffe4c1b8ed1c2fa946e8d60',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from JOKE API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Pun?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellME(joke);    
        // Disable button
        toggleButton();
    } catch (error) {
        // catch errors
        console.log("whoops",error);
    }
}

//  Event LIsteners;
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);