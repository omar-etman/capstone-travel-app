import { updateUi } from './app.js';

test ("updateUi calls reverseFormatCityName",()=>{
    updateUi();
    expect(reverseFormatCityName).toHaveBeenCalled()
})