import {
    typageAdressChoix, typageZipCodeChoix, typageCityChoix,
    divParentAddessChoixName, FiedsNamesAddressJson,
    divParenttZipCodeChoixName, FieldsNameGeoJson,
    divParentCityChoixName,
    FormAddrDefaultTimout
} from './FormConst.js';
import {
    divParentAddessChoix,
    divParentZipCodeChoix,
    divParentCityChoix,
    returnTagValueFromADivChild,
    createChildChoix
} from './DivChoix.js';
import {PreTag} from "./preAlgo.js";
import {ApiGouv} from "./ApiGouv.js";


export const FormAdressActions = class {
    #preTag;
    #apiGouv;

    #previousAddress;
    #previousZipCode;
    #previousCity;

    #actualChild;
    #actualInputValue;
    #actualParent;
    #actualPreviousValue;
    #actualParentNameToRemove;

    constructor(preTag = null){
        if (preTag == null) {
            preTag = new PreTag();
        }
        this.#previousAddress = '';
        this.#apiGouv = new ApiGouv();
        this.#preTag = preTag;
    };

    clickOther(){this.hideMenus();}

    inputAction(value, from){
        setTimeout(()=>{
            this.putNanValue(from);
            this.actionInputClick(value, from);
        },FormAddrDefaultTimout);
    }

    #memoriseCase(from, childTarget=null){
        this.#actualChild = childTarget;
        switch(from){
            case typageAdressChoix:
                this.#actualPreviousValue = this.#previousAddress;
                this.#previousAddress = this.#actualInputValue;
                this.#actualParentNameToRemove = divParentAddessChoixName;
                this.#actualParent = new divParentAddessChoix();
                return true;
            case typageZipCodeChoix:
                this.#actualPreviousValue = this.#previousZipCode;
                this.#previousZipCode = this.#actualInputValue;
                this.#actualParentNameToRemove = divParenttZipCodeChoixName
                this.#actualParent = new divParentZipCodeChoix();
                return true;
            case typageCityChoix:
                this.#actualPreviousValue = this.#previousCity;
                this.#previousCity = this.#actualInputValue;
                this.#actualParentNameToRemove = divParenttZipCodeChoixName
                this.#actualParent = new divParentCityChoix();
                return true;
            default:
                return false;
        }
    }

    actionInputClick(inputValue, from){
        this.#actualInputValue = inputValue;
        if (this.isInputConditionBase()) {
            if (this.isInputConditionSpecifiqueZipCode() || from !== typageZipCodeChoix) {
                if (from === typageZipCodeChoix) {this.#preTag.reformatSmallZipCode();}
                this.removeActualParent();
                if(this.#memoriseCase(from)) {
                    this.#actualParent.attachToParent();
                    this.#apiGouv.getDataFrom(inputValue, from)
                        .then(results => createDivChoixChildren(results, this.#actualParent.getId(), from))
                        .then(this.#actualParent.show());
                }
            }
        }else if(this.isConditionSame()){this.showGoodChild(from);}
    }

    clickOnChoix(target, from){
        let divParent, divParentName,fields;
        switch(from){
            case typageAdressChoix: divParentName =  divParentAddessChoixName;  fields = FiedsNamesAddressJson;     break;
            case typageZipCodeChoix:divParentName = divParenttZipCodeChoixName; fields = FieldsNameGeoJson;         break;
            case typageCityChoix:divParentName =    divParentCityChoixName;     fields = FieldsNameGeoJson;         break;
            default: return;
        }
        divParent = document.getElementById(divParentName);

        if (divParent !== null){
            let formatedValues = returnTagValueFromADivChild(target);
            this.setInputsAdress(formatedValues, from, fields);
            divParent.classList.remove('show');
        }
    }

    setInputsAdress(formatedValues, from, fields){
        if (fields !== null) {
            if (from === typageAdressChoix) {
                this.#preTag.setInputAddressValue(formatedValues[fields.short]);
                this.#preTag.setInputAddressRefValue(formatedValues[fields.id]);
                this.#preTag.setInputAddessNoValue(formatedValues[fields.no]);
                this.#preTag.setInputAddressStreetValue(formatedValues[fields.street]);
                this.#preTag.setInputAddressAutoStatus('true');
            }
            if ((this.#preTag.getinputZipCodeValue() === '' || this.#preTag.getinputZipCodeAutoStatus() && from === typageAdressChoix)
                ||from === typageZipCodeChoix) {
                this.#preTag.setInputZipCodeValue(formatedValues[fields.zipcode]);
                this.#preTag.setInputZipCodeAutoStatus('true');
            }

            if (((this.#preTag.getinputCityValue() === '' || this.#preTag.getInputCityAutoStatus())&&
                (from === typageAdressChoix || from === typageZipCodeChoix ))
                || from === typageCityChoix) {
                this.#preTag.setInputCityCodeValue(formatedValues[fields.codecity])
                this.#preTag.setInputCityValue(formatedValues[fields.city])
                this.#preTag.setInputCityAutoStatus('true');
            }
        }
    }

    hideMenus(){
        let namesParents = [divParentAddessChoixName, divParenttZipCodeChoixName, divParentCityChoixName];
        namesParents.forEach(np =>{
            let divtmp = document.getElementById(np);
            if (divtmp !== null){divtmp.classList.remove('show');}
        });
    }

    showGoodChild(from){
        let divParent;
        switch(from){
            case typageAdressChoix:     divParent = document.getElementById(divParentAddessChoixName);
                break;
            case typageZipCodeChoix:    divParent = document.getElementById(divParenttZipCodeChoixName);
                break;
            case typageCityChoix:       divParent = document.getElementById(divParentCityChoixName);
                break;
        }
        if (divParent !== null){
            divParent.classList.add('show');
        }
    }

    isInputConditionBase(){
        return (this.#actualInputValue !== null && this.#actualInputValue !== '' && this.#actualInputValue !== this.#actualPreviousValue);
    }

    isConditionSame(){
        return (this.#actualInputValue !== null && this.#actualInputValue !== '' && this.#actualInputValue === this.#actualPreviousValue);
    }

    putNanValue(from){
        switch (from){
            case  typageAdressChoix:
                this.#preTag.setFalseValueAdress();
                break;
            case typageZipCodeChoix:
                this.#preTag.setFalseValueZipCode();
                break;
            case typageCityChoix:
                this.#preTag.setFalseValueCity();
                break;
        }
    }

    isInputConditionSpecifiqueZipCode(){
        return this.#actualInputValue.length> 3;
    }

    removeActualParent(){
        if (this.#actualParent !== null && this.#actualParent !== undefined) {
            this.#actualParent.remove();
            this.#actualParent = null;
        }
    }
}

function createDivChoixChildren(datasFormated, parentName, from){
    if(datasFormated.length > 0){
        datasFormated.forEach(dataset=>{
            let divC = createChildChoix(from);
            divC.fillAdress(dataset);
            divC.attachToParent(parentName);
        });
    }
}
