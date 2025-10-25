import { requestsService } from '../services/firebase.service.js';
import { MyApiService } from '../services/api.service.js';

const myApiService = new MyApiService(process.env.API_EXTERNA_URL);

export class RequestsController {

    static async consultAndSave(req, res, next) {

        try {
            const { dni } = req.body;
            console.log(`consultAndSave DNI = ${dni}`);

            if(!dni){
                return res.status(400).json({
                    success: false,
                    error: 'DNI es requerido'
                });
            }

            // 1. Consultar API externa
            const externalData = await myApiService.requestById(dni);

            // 2. Guardar en Firebase
            const saveDocument = await requestsService.create({
                dni,
                data: externalData,
                source: 'api-externa'
            });

            // 3. Responder al cliente
            res.json({
                success: true,
                id: saveDocument.id,
                data: externalData,
                message: 'Datos consultados y guardados exitosamente'
            })

        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        console.log("getById");
        try {
            const {dni} = req.params;
            // 1. Buscar en Firebase primero
            const request = await requestsService.getById(dni);

            if(request){
                return res.json({
                    success: true,
                    data: request,
                    source: 'cache'
                });
            }

            // 2. Si no existe, consultar API externa
            const externalData = await myApiService.requestById(dni);

            // 3. Guardar en Firebase
            const newDocument = await requestsService.create({
                id: dni,
                data: externalData,
                source: 'api-externa'
            });

            // 4. Retornar datos
            res.json({
                success: true,
                data: newDocument,
                source: 'api'
            });
        }catch(error) {
            next(error);
        }
    }
}