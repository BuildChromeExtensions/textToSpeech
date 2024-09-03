
// add voice to select list on load
chrome.tts.getVoices((voices) => {
    const select = document.querySelector('select');
    for (var i = 0; i < voices.length; i++) {
        const option = document.createElement('option');
        option.textContent = voices[i].voiceName + `${voices[i].voiceName} (${voices[i].lang})`;
        option.value = voices[i].voiceName;
        select.appendChild(option);
    }
});

document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const volume = parseFloat(e.target.volume.value);
    const pitch = parseFloat(e.target.pitch.value);
    const rate = parseFloat(e.target.rate.value);
    const enqueue = e.target.enqueue.checked;
    const voiceName = e.target.voiceName.value;

    chrome.tts.speak(text, {

        /**************************
         * 
         * All these are optional
         * 
        ********************** */ 
        
        volume: volume, // 0.0 - 1.0
        rate: rate,  // 0.1 - 10.0
        pitch: pitch, // 0.0 -  2.0
        lang: 'en-US', // in the form language-region. Examples: 'en', 'en-US', 'en-GB', 'zh-CN'.

        // override any current TTSs in progress.
        enqueue: enqueue,

        // If empty, uses any available voice.
        voiceName: voiceName,

        // event handler
        onEvent: (ttsEvent) => {
            console.log(ttsEvent)
        }

    });
}

document.getElementById('pause').onclick = () => {
    chrome.tts.pause();
}

document.getElementById('resume').onclick = () => {
    chrome.tts.resume();
}
document.getElementById('stop').onclick = () => {
    chrome.tts.stop();
}

