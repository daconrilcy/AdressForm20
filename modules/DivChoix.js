const divAdressName = 'divadress';
const divParentAddessChoixName = 'divaddresschoix';

const divCityName = 'divcity';
const divParentCityChoixName = 'divcitychoix';

const classNameDivChoix = 'divChoixChild'

const tagsNamesAddressChild = [
    'data-id', 'data-no', 'data-street', 'data-codepost',
    'data-codecity', 'data-city','data-lon', 'data-lat','data-short'
];

const tagsNamesCityChild = ['data-codecity','data-city'];

const Tag = class {
    nomTag;
    value;
    className;

    constructor(nomTag="tag",value="") {
        this.nomTag=this.formatTagName(nomTag);
        this.value=value;
        this.className='Tag';
    }

    formatTagName(tagName) {
        if (typeof tagName === 'string') {
            tagName = tagName.toLowerCase();
            if (tagName.toLowerCase().substring(0, 5) !== 'data-') {
                tagName = "data-" + tagName;
            }
        }

        return tagName;
    }
}


const DivManagement = class{
    div;
    #parent;
    className;
    childs;

    constructor(
        id,
        parentName,
        textContent,
        tags,
        className){
        if (tags === null || tags === undefined){
            tags = [];
        }

        this.createFrame(id,
            parentName,
            textContent,
            tags,
            className)
    }

    formatElementName(elementName){
        if (elementName.substring(0,1) !=="#"){
            elementName = "#" + elementName;
        }
        return elementName;
    }

    createFrame( id,
                 parentName,
                 textContent,
                 tagsNames,
                 className){
        this.div = document.createElement('div');
        this.div.className=className;
        this.setId(id);

        const txtNd = document.createTextNode(textContent);
        if (tagsNames === null){tagsNames = [];}
        if (tagsNames.length > 0){this.addTagsNames(tagsNames);
        }
        this.div.appendChild(txtNd);
        this.attachToParent(parentName);
        this.childs = [];

    }


    reformatTagName(tagName){
        tagName = tagName.toLowerCase();
        if (tagName.toLowerCase().substring(0,5) !== 'data-') {
            tagName = "data-" + tagName;
        }
        return tagName;
    }

    addTag(tagName, value=''){
        if (typeof tagName=== 'string'){
            tagName = this.reformatTagName(tagName);
            this.div.setAttribute(tagName,value);
        }
        if (typeof tagName === 'object'){
            if (tagName.className === 'Tag'){
                this.div.setAttribute(tagName.nomTag,tagName.value);
            }
        }
    }
    addTagsNames(tagsNames){
        if (typeof tagsNames === 'string' || typeof tagsNames === 'object'){
            tagsNames = [tagsNames];
        }
        tagsNames.forEach(tag => this.addTag(tag));
    }

    changeTagName(oldtagName, newtagName){
        this.reformatTagName(newtagName)
        this.div.removeAttribute(oldtagName);
        this.addTag(newtagName);
    }

    setTagValue(tagName, value){
        this.div.setAttribute(tagName,value);
    }

    attachToParent(parentName ='') {
        if (parentName !== '') {
            parentName = this.formatElementName(parentName);
            this.#parent = document.querySelector(parentName);
        }
        if (this.#parent !== null && this.#parent !== undefined){
            this.#parent.appendChild(this.div);
        }
    }

    addClass(className){
        this.div.classList.add(className);
    }
    removeClass(className){
        this.div.classList.remove(className);
    }

    getClassName(){
        return this.div.className;
    }

    get(){
        return this.div;
    }
    putText(texToAdd){
        this.div.childNodes[0].textContent = texToAdd;
    }

    remove() {
        this.div.remove();
        this.div = null;
    }
    setId(id){
        this.div.id = id;
        this.div.setAttribute('name',id);
    }

    getId(){
        return this.div.id;
    }

    getName(){
        return this.div.getAttribute('name');
    }

}

const DivChoixParent = class extends DivManagement {
    constructor(
        id,
        parentName,
        textContent = "",
        tags = [],
        ) {
        super(id, parentName,  "", [], "mb-3 dropdown-menu relative");
    }

    show(){
        this.addClass("show");
    }
    hide(){
        this.removeClass("show");
    }

    addChild(child){
        if(child.className === classNameDivChoix){
            this.div.appendChild(child.get());
            this.childs.push(child);
        }

    }

    addChildren(children){
        if(children.length>0){
            children.forEach(child=>this.addChild(child));
        }
    }
    removeChilds(){
        this.childs.forEach(child=>{
            child.get().remove();
        });
        this.childs = [];
    }
}

export const divParentAddessChoix = class extends DivChoixParent {

    constructor(id=divParentAddessChoixName, parentName=divAdressName ){
        super(id, parentName);
    }
}
export const divParentCityChoix = class extends DivChoixParent {

    constructor(id=divParentCityChoixName, parentName=divCityName ){
        super(id, parentName)
    }
}

class DivChoixChild extends DivManagement {

    constructor(parentName, tags, textContent) {
        super('', parentName,  textContent, tags, "myMenu");
        this.className = classNameDivChoix
    }

}

export class divChoixAdressChild extends DivChoixChild{
    #tagCodeCity;
    #tagCityName;
    #tagCodeCityOgj;
    #tagCityNameObj;

    constructor(textContent='', tagCodecityValue='', tagCityNameValue=''){
        super(divParentCityChoixName,[], textContent);
        this.#tagCodeCity = tagsNamesCityChild[0];
        this.#tagCityName = tagsNamesCityChild[1];
        this.#tagCodeCityOgj = new Tag(this.#tagCodeCity, tagCodecityValue);
        this.#tagCityNameObj = new Tag(this.#tagCodeCity, tagCityNameValue);
        this.addTag(this.#tagCodeCityOgj);
        this.addTag(this.#tagCityNameObj);
    }

    changeTagCodeCityName(tagCodeCity){
        this.changeTagName(this.#tagCodeCity, tagCodeCity);
        this.#tagCityNameObj.nomTag = this.#tagCodeCity;
    }

    changeTagCityName(tagCityName){
        this.changeTagName(this.#tagCityName, tagCityName);
        this.#tagCityNameObj.nomTag = this.#tagCityName;
    }
    changeTagCodeCityValue(tagCodeCityValue){
        this.#tagCodeCityOgj.value = tagCodeCityValue;
        this.setTagValue(this.#tagCodeCityOgj.nomTag, tagCodeCityValue);
    }
    changeTagCityNameValue(tagCityNameValue){
        this.#tagCityNameObj.value = tagCityNameValue;
        this.setTagValue(this.#tagCityNameObj.nomTag, tagCityNameValue);
    }

}

export function createCityChoixChild(listcityFromJson){

}