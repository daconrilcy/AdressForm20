import * as dv from './DivChoix.js';
import {DivParentAdressChoix} from "./DivChoix.js";

document.addEventListener("DOMContentLoaded", function() {
    let a = new DivParentAdressChoix();
    console.log(a.div.classList)
});