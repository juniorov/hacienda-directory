<script setup>
import { useTaxpayerStore } from '../stores/taxpayer';
import { storeToRefs } from 'pinia';
import Card from './Card.vue';
import Spinner from './Spinner.vue';

const taxpayerStore = useTaxpayerStore();
// Usar storeToRefs para mantener reactividad
const { taxpayer, loading, error } = storeToRefs(taxpayerStore);
</script>

<template>
    <div class="row">
        <div class="col-12">
            <Spinner v-if="loading" class="alert alert-info"/>
            <div v-else-if="error" class="alert alert-warning">Error al cargar la información</div>
            <table v-else-if="taxpayer" class="table my-4">
                <thead>
                    <tr>
                        <th scope="col" colspan="2" class="text-center"><h4>Información</h4></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="col">Nombre</th>
                        <td scope="col"><span id="name" class="text-capitalize">{{ taxpayer.data.nombre }}</span></td>
                    </tr>
                    <tr>
                        <th>Regimen</th>
                        <td>{{ taxpayer.data.regimen.descripcion }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-if="taxpayer" class="row row-cols-1 row-cols-md-3 g-4">
        <Card  v-for="activity in taxpayer.data.actividades"
            :key="activity.codigo"
            :name="activity.descripcion"
            :newCode="activity.codigo"
            :oldCode="activity?.ciiu3[0]?.codigo"
        />
    </div>
</template>