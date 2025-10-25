import 'dotenv/config';

export class ApiService {
    constructor(baseURL) {
        // Inicialización si es necesario
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        try{
            const urlApi = `${this.baseURL}${endpoint}`;
            console.log(urlApi);

            const response = await fetch(urlApi);

            if(!response.ok){
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        }
        catch(error){
            console.log('Error en API externa: '. error);
            throw new Error(`No se pudo obtener datos: ${error.message}`);
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch( error ) {
            console.log('Error en API externa: ', error);
            throw new Error(`No se pudo enviar datos: ${error.message}`);
        }
    }
}

export class MyApiService extends ApiService {
    constructor() {
        super(process.env.API_EXTERNA_URL); // Reemplaza con la URL base real de la API
    }

    async requestById(dni) {
        return this.get(`${dni}`);
    }
}