import {typageAdressChoix,typageZipCodeChoix, typageCityChoix,
    FiedsNamesAddressJson, FieldsNameGeoJson} from './FormConst.js'
export class ApiGouv{

    getCityFromZipBrut(val) {
        let url = 'https://geo.api.gouv.fr/communes?codePostal='+val+'&fields=departement&boost=population&limit=10';
        return fetch(url,{method: 'GET'})
            .then(response=>{return response.json()});

    }
    getCityFromCityBrute(val, limit=6){
        let url =  'https://geo.api.gouv.fr/communes?nom='+val+'&fields=departement&boost=population&limit='+limit;
        return fetch(url,{method: 'GET'})
            .then(response=>{return response.json()});
    }

    getAdressBrute =function(val, limit=15){

        let url = 'https://api-adresse.data.gouv.fr/search/?q='+val+'&limit='+limit;

        return fetch(url,{method:'GET'})
            .then(response => {return response.json()});

    }

    getAddressData(adress) {
        return this.getAdressBrute(adress)
            .then(results =>{
                let resultsFormatted = [];
                let datas = results['features'];
                if (datas.length > 0) {
                    datas.forEach(data =>{
                        let tmpObj = {};
                        tmpObj[FiedsNamesAddressJson.id]=               data['properties']['id'];
                        tmpObj[FiedsNamesAddressJson.no]=               data['properties']['housenumber'];
                        tmpObj[FiedsNamesAddressJson.street]=           data['properties']['street'];
                        tmpObj[FiedsNamesAddressJson.zipcode]=          data['properties']['postcode'];
                        tmpObj[FiedsNamesAddressJson.codecity]=         data['properties']['citycode'];
                        tmpObj[FiedsNamesAddressJson.city]=             data['properties']['city'];
                        tmpObj[FiedsNamesAddressJson.lat]=              data['geometry']['coordinates'][1];
                        tmpObj[FiedsNamesAddressJson.lon]=              data['geometry']['coordinates'][0];
                        tmpObj[FiedsNamesAddressJson.short]=            data['properties']['name'];
                        tmpObj[FiedsNamesAddressJson.long]=             data['properties']['label'];
                        resultsFormatted.push(tmpObj);
                    });
                }
                return resultsFormatted;
            });

    }

    getCityFromZip(zipcode){
        return this.getCityFromZipBrut(zipcode)
            .then(results=>{return this.formatedValuesFromGeo(results,zipcode);});
    }



    getCityFromCity(city) {
        return this.getCityFromCityBrute(city)
            .then(results=>{return this.formatedValuesFromGeo(results);});
    }

    formatedValuesFromGeo(results =[], zipcode ='') {
        let resultsFormatted = [];
        if (results.length > 0) {
            results.forEach(data=>{
                let tmpObj = {};
                tmpObj[FieldsNameGeoJson.zipcode] =          zipcode;
                tmpObj[FieldsNameGeoJson.city] =             data['nom'];
                tmpObj[FieldsNameGeoJson.codecity] =         data['code'];
                tmpObj[FieldsNameGeoJson.departcode] =       data['departement']['code'];
                tmpObj[FieldsNameGeoJson.departnom] =        data['departement']['nom'];
                resultsFormatted.push(tmpObj);
            });
        }

    return resultsFormatted;
    }


    getDataFrom(inputValue, from){
        switch(from){
            case typageAdressChoix:
                return this.getAddressData(inputValue);
            case typageZipCodeChoix:
                return this.getCityFromZip(inputValue);
            case typageCityChoix:
                return this.getCityFromCity(inputValue);
        }
    }

}