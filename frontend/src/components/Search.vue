<script setup>
import { ref } from 'vue';
import { useTaxpayerStore } from '../stores/taxpayer';

const taxpayerStore = useTaxpayerStore();
const dni = ref('');

const handleClick = async (event) => {
    event.preventDefault();

    if(!dni.value.trim()) return;

    await taxpayerStore.fetchTaxpayer(dni.value);
};
</script>

<template>
    <div class="row">
        <div class="col-12">
            <form @submit.prevent="handleClick">
                <div class="mb-3">
                    <label for="dni" class="form-label">Ingrese número de cédula</label>
                    <input type="text" class="form-control" id="dni" v-model="dni" aria-describedby="dniHelp" />
                    <div id="dniHelp" class="form-text">Puede ser Física o Jurídica.</div>
                </div>
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="taxpayerStore.loading"
                >
                    {{ taxpayerStore.loading ? 'Buscando...' : 'Buscar' }}
                </button>
            </form>
            <!-- Mostrar error del store -->
            <div v-if="taxpayerStore.error" class="alert alert-danger mt-3">
                Error: {{ taxpayerStore.error }}
            </div>
        </div>
    </div>
</template>