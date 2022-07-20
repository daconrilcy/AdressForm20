export class ApiGouv{

    getCityFromZip(val) {
        let url = 'https://geo.api.gouv.fr/communes?codePostal='+val+'&fields=departement&boost=population&limit=10';
        return fetch(url,{method: 'GET'})
            .then(response=>{return response.json()});

    }
    getCityFromCity(val){
        let url =  'https://geo.api.gouv.fr/communes?nom='+val+'&fields=departement&boost=population&limit=6';
        return fetch(url,{method: 'GET'})
            .then(response=>{return response.json()});
    }

    getAdress(val){

        let url = 'https://api-adresse.data.gouv.fr/search/?q='+val+'&limit=15';

        return fetch(url,{method:'GET'})
            .then(response => {return response.json()});
    }
}
