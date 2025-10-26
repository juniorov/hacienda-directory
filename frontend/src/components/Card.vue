<script setup>
defineProps({
    name: {
        type: String,
    },
    newCode: {
        type: String,
    },
    oldCode: {
        type: String,
    },
});
</script>

<template>
    <div class="col">
        <div class="card">
            <div class="card-header text-bg-primary">
                {{name}}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><h6>Código Nuevo: <span class="new-code text-danger">{{ newCode }}</span></h6></li>
                <li class="list-group-item"><h6>Código Viejo: <span class="new-code text-body-tertiary">{{ oldCode   }}</span></h6></li>
            </ul>
        </div>
    </div>
</template>