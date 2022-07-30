import  {
    divTagType,
    typageAdressChoix,
    typageZipCodeChoix,
    typageCityChoix
} from './FormConst.js';
import {PreTag} from './PreAlgo.js';
import {FormAdressActions} from "./FormAdressActions.js";

export function addlisteners(pretag = null, 
                             formActions,
                             ) {
    let pt = pretag;
    if (pt === null) {
        pt = new PreTag();
    }

    if (formActions === null) {formActions = new FormAdressActions()}
    let fA = formActions;

    document.addEventListener("click", function (event) {
        let target = event.target;
        let id = event.target.id;
        let value = event.target.value;
        let from = event.target.getAttribute(divTagType);

        if (id === pt.getInputAddressName()) {
            fA.actionInputClick(value, typageAdressChoix);
        }

        else if (id === pt.getinputZipCodeName()) {

            fA.actionInputClick(value, typageZipCodeChoix);
        }

        else if (id === pt.getinputCityName()) {
            fA.actionInputClick(value, typageCityChoix);
        }
        else if (from === typageAdressChoix || from === typageZipCodeChoix || from === typageCityChoix){
            fA.clickOnChoix(target, from);
        }
        else{
            fA.clickOther();
        }

    });

    document.addEventListener("input", function (event) {
        //console.log("input :"+event.target.id);
        let id = event.target.id;
        let value = event.target.value;
        let lenValue = event.target.value.length;
        if (lenValue > 3) {
            if (id === pt.getInputAddressName()) {
                fA.inputAction(value, typageAdressChoix);
            } else if (id === pt.getinputZipCodeName()) {
                fA.inputAction(value, typageZipCodeChoix);
            } else if (id === pt.getinputCityName()) {
                fA.inputAction(value, typageCityChoix);
            }
        }
    });
}