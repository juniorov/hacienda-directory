import { db } from '../config/firebase.js';

export class FirebaseService {
    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async create(document) {
        try {
            const docRef = await this.collection.add({
                ...document,
                createdAt: new Date().toISOString(),
                timestamp: new Date()
            });

            return {
                id: docRef.id,
                ...document
            };
        }catch(error) {
            console.log('Error al crear documento en Firestore: ', error);
            throw new Error(`No se pudo crear el documento: ${error.message}`);
        }
    }

    async getAll(max = 10, orderByIn = 'timestamp', order = 'desc') {
        try {
            const snapshot = await this.collection
                .orderBy(orderByIn, order)
                .limit(max)
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch(error) {
            console.log('Error al obtener documentos de Firestore: ', error);
            throw new Error(`No se pudieron obtener los documentos: ${error.message}`);
        }
    }

    async getById(id) {
        try{
            const doc = await this.collection.doc(id).get();

            if(!doc.exists){
                return null;
            }

            return {
                id: doc.id,
                ...doc.data()
            };
        }catch(error) {
            console.log('Error al obtener documento de Firestore: ', error);
            throw new Error(`No se pudo obtener el documento: ${error.message}`);
        }
    }
}

// Instancia para la colección 'requests'
export const requestsService = new FirebaseService('taxpayers');