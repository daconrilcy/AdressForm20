import {
    divAdressName, divParentAddessChoixName, divCityName, divParentCityChoixName,
    classNameDivChoixParent, classNameDivChild,
    divZipCodeName, divParenttZipCodeChoixName, tagsNamesGeoChild, FieldsNameGeoJson, typageZipCodeChoix,
    tagsNamesAddressChild, FiedsNamesAddressJson, typageAdressChoix, divTagType,
    typageCityChoix
} from './FormConst.js'

const DivManagement = class{
    div;
    #parent;
    className;

    constructor(id, parentName, textContent, className){this.createFrame(id, parentName, textContent, className);}

    createFrame( id, parentName, textContent, className){
        this.div = document.createElement('div');
        this.div.className=className;
        this.setId(id);
        const txtNd = document.createTextNode(textContent);
        this.div.appendChild(txtNd);
        this.attachToParent(parentName);
    }

    attachToParent(parentName ='') {
        if (parentName !== '') {this.#parent = document.getElementById(parentName);}
        if (this.#parent !== null && this.#parent !== undefined){
            this.#parent.appendChild(this.div);
        }
    }

    addClass(className){this.div.classList.add(className);}

    putText(texToAdd){this.div.childNodes[0].textContent = texToAdd;}

    remove() {
        this.div.remove();
        this.div = null;
    }
    setId(id){
        if(id !== null && id !== undefined && id !== '') {
            this.div.id = id;
            this.div.setAttribute('name', id);
        }
    }

    getId(){return this.div.id;}

    show(){this.addClass("show");}
}

const DivChoixParent = class extends DivManagement {
    constructor(id, parentName) {super(id, parentName, "", classNameDivChoixParent);}
}

export const divParentAddessChoix = class extends DivChoixParent {
    constructor(){super(divParentAddessChoixName, divAdressName);}
}

export const divParentZipCodeChoix = class extends DivChoixParent {
    constructor(){super(divParenttZipCodeChoixName, divZipCodeName);}
}

export const divParentCityChoix = class extends DivChoixParent {
    constructor(){ super(divParentCityChoixName, divCityName)}
}

class DivChoixChild extends DivManagement {
    typeChild;
    jsonStruct = {};
    tagNamesStruct = {};
    constructor(parentName, typeChild, tagNamesStruct = {}, jsonStruct ={}) {
        super('', parentName, "", classNameDivChild);
        this.typeChild = typeChild;
        this.tagNamesStruct = tagNamesStruct;
        this.jsonStruct = jsonStruct;
        this.div.setAttribute(divTagType, typeChild);
    }

    fillAdress(address) {
        for (let tagStr in this.jsonStruct) {
            this.div.setAttribute(this.tagNamesStruct[tagStr], address[tagStr]);
        }

        this.div.setAttribute(divTagType, this.typeChild);
        this.defineTextAffich(address);
    }
    defineTextAffich(address){}
}

export class divChoixAdressChild extends DivChoixChild{
    constructor(){ super(divParentCityChoixName,typageAdressChoix, tagsNamesAddressChild, FiedsNamesAddressJson); }
    defineTextAffich(address){this.putText( address[this.jsonStruct.long]);}
}

export class divChoixZipCodeChild extends DivChoixChild {
    constructor(){super(divParenttZipCodeChoixName, typageZipCodeChoix, tagsNamesGeoChild, FieldsNameGeoJson);}
    defineTextAffich(address){this.putText(address[FieldsNameGeoJson.city]);}
}

export class divChoixCityChild extends DivChoixChild {
    constructor() {super(divParentCityChoixName, typageCityChoix, tagsNamesGeoChild, FieldsNameGeoJson);}
    defineTextAffich(address){
        let TextAffich = address[FieldsNameGeoJson.city] + ", " + address[FieldsNameGeoJson.departcode] + " " + address[FieldsNameGeoJson.departnom];
        this.putText(TextAffich);
    }
}

export function returnTagValueFromADivChild(childObject) {
    let returnValues = {};
    let tags = {};
    let isTagsExist = false;
    let TypeChild = childObject.getAttribute(divTagType);
    if (TypeChild === typageAdressChoix){
        tags = tagsNamesAddressChild;
        isTagsExist = true;
    }else if (TypeChild === typageZipCodeChoix || TypeChild === typageCityChoix ){
        tags = tagsNamesGeoChild;
        isTagsExist = true;
    }
    if(isTagsExist){
        for (let i in tags){
            returnValues[i] = childObject.getAttribute(tags[i]);
        }
    }
    return returnValues;
}

export function createChildChoix(childType){
    let child;
    switch (childType){
        case typageAdressChoix:
            child = new divChoixAdressChild();
            break;
        case typageZipCodeChoix:
            child = new divChoixZipCodeChild();
            break;
        case typageCityChoix:
            child = new divChoixCityChild();
            break;
    }
    return child;
}