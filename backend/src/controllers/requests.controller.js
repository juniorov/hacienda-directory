import { requestsService } from '../services/firebase.service.js';
import { MyApiService } from '../services/api.service.js';

const myApiService = new MyApiService(process.env.API_EXTERNA_URL);

export class RequestsController {

    static async consultAndSave(req, res, next) {

        try {
            const { dni } = req.body;

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
        try {
            const {dni} = req.params;
            // 1. Buscar en Firebase primero
            const request = await requestsService.getByDNI(dni, "id");

            if(request){
                // Verificar si necesita actualización (más de 15 días)
                const needUpdate = RequestsController.#shouldUpdate(request.updatedAt);

                if (!needUpdate) {
                    return res.json({
                        success: true,
                        data: request,
                        source: 'cache',
                        updated: false
                    });
                }

                const externalData = await myApiService.requestById(dni);

                await requestsService.updateByDNI('id', dni, {
                    data: externalData,
                    updatedAt: new Date().toISOString(),
                    source: 'api-externa-updated'
                });

                const taxpayerUpdated = await requestsService.getById('id', dni);

                return res.json({
                    success: true,
                    data: taxpayerUpdated,
                    source: 'cache-updated',
                    updated: true
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
                source: 'api',
                updated: true
            });
        }catch(error) {
            next(error);
        }
    }

    // Método privado para verificar expiración
    static #shouldUpdate(updatedAt) {
        if (!updatedAt) return true;

        const updateDate = new Date(updatedAt);
        const now = new Date();
        const daysDiff = (now - updateDate) / (1000 * 60 * 60 * 24);

        return daysDiff > 15; // Más de 15 días
    }
}