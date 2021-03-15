import { updateUi } from './app.js';

test ("updateUi calls reverseFormatCityName",()=>{
    document.body.innerHTML = `
    <div class = "holder entry">
        <img class = "image"/>
        <div class = "destination__name"></div>
        <div class = "destination__weather"></div>
        <div class = "destination__distance"></div>
    </div>
    `;
    updateUi();
    setTimeout(() => {
        expect(reverseFormatCityName).toHaveBeenCalled()
    })
})