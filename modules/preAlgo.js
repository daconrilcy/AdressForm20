import {
    inputAddessTagName, inputAddessRefTagName, inputAddessNoTagName, inputAddessStreetTagName,
    inputZipCodeTagName, inputCityTagName, inputCityCodeTagName, inputTagName, inputTagAuto,nonAutoDefaultValue
} from "./FormConst.js";

export const PreTag = class {
    #inputAddressName;
    #inputAddressRefName;
    #inputAddessNoName;
    #inputAdressStreetName;

    #inputZipCodeName;

    #inputCityCodeName;
    #inputCityName;


    #inputAddress;
    #inputRefAddress;
    #inputNoAddress;
    #inputStreetAddress;

    #inputZipCode;

    #inputCityCode;
    #inputCity;


    constructor(){
        let inputs = document.getElementsByTagName("input");
        let ia, ib, ic, id, ie, ig, iz;
        if (inputs.length > 0) {
            for (let n = 0; n < inputs.length; n++) {
                let inpid = inputs[n].getAttribute(inputTagName);
                if (inpid === inputAddessTagName)       {ia = inputs[n].id;}
                if (inpid === inputAddessRefTagName)    {ib = inputs[n].id;}
                if (inpid === inputAddessNoTagName)     {ic = inputs[n].id;}
                if (inpid === inputAddessStreetTagName) {id = inputs[n].id;}
                if (inpid === inputZipCodeTagName)      {ie = inputs[n].id;}
                if (inpid === inputCityCodeTagName)     {ig = inputs[n].id;}
                if (inpid === inputCityTagName)         {iz = inputs[n].id;}
            }
        }
        this.#inputAddressName =        ia;
        this.#inputAddressRefName =     ib;
        this.#inputAddessNoName =       ic;
        this.#inputAdressStreetName =   id;

        this.#inputZipCodeName =        ie;
        this.#inputCityCodeName =       ig;
        this.#inputCityName =           iz;

        this.#inputAddress =            document.getElementById(this.getInputAddressName());
        this.#inputRefAddress =         document.getElementById(this.getInputAddressRefName());
        this.#inputNoAddress =          document.getElementById(this.getInputAddessNoName());
        this.#inputStreetAddress =      document.getElementById(this.getInputAddressStreetName());
        this.#inputZipCode =            document.getElementById(this.getinputZipCodeName());
        this.#inputCityCode =           document.getElementById(this.getinputCityCodeName())
        this.#inputCity =               document.getElementById(this.getinputCityName());
    }

    getInputAddressName()                       { return this.#inputAddressName; }
    getInputAddressRefName()                    { return this.#inputAddressRefName; }
    getInputAddessNoName()                      { return this.#inputAddessNoName; }
    getInputAddressStreetName()                 { return this.#inputAdressStreetName; }
    getinputZipCodeName()                       { return this.#inputZipCodeName; }
    getinputCityCodeName()                      { return this.#inputCityCodeName; }
    getinputCityName()                          { return this.#inputCityName; }

    getinputZipCodeValue()                      { return this.#inputZipCode.value; }
    getinputZipCodeAutoStatus()                 { return this.#inputZipCode.getAttribute(inputTagAuto) === 'true'; }

    getinputCityValue()                         { return this.#inputCity.value; }
    getInputCityAutoStatus()                    { return this.#inputCity.getAttribute(inputTagAuto) === 'true'; }

    setInputAddressAutoStatus(valueToSet)       {this.#inputAddress.setAttribute(inputTagAuto, valueToSet);}
    setInputAddressValue(valueToSet)            {this.#inputAddress.value = valueToSet;}
    setInputAddressRefValue(valueToSet)         {this.#inputRefAddress.value = valueToSet;}
    setInputAddessNoValue(valueToSet)           {this.#inputNoAddress.value = valueToSet;}
    setInputAddressStreetValue(valueToSet)      {this.#inputStreetAddress.value = valueToSet;}

    setInputZipCodeValue(valueToSet)            {this.#inputZipCode.value = valueToSet}
    setInputZipCodeAutoStatus(valueToSet)       {this.#inputZipCode.setAttribute(inputTagAuto, valueToSet);}

    setInputCityCodeValue(valueToSet)           {this.#inputCityCode.value = valueToSet;}
    setInputCityValue(valueToSet)               {this.#inputCity.value = valueToSet;}
    setInputCityAutoStatus(valueToSet)          {this.#inputCity.setAttribute(inputTagAuto, valueToSet);}

    setFalseValueAdress(){
        this.setInputAddressAutoStatus(false);
        this.setInputAddressRefValue(nonAutoDefaultValue);
        this.setInputAddessNoValue(nonAutoDefaultValue);
        this.setInputAddressStreetValue(nonAutoDefaultValue);
    }
    setFalseValueZipCode(){
        this.setInputZipCodeAutoStatus(false);
    }
    setFalseValueCity(){
        this.setInputCityCodeValue(nonAutoDefaultValue);
        this.setInputCityAutoStatus(false);
    }

    reformatSmallZipCode() {
        let inputValue = this.getinputZipCodeValue();
        if (inputValue.length === 4) {
            inputValue = "0" + inputValue;
            this.setInputCityCodeValue(inputValue);
        }
    }
}
