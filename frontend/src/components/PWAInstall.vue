<template>
    <div v-if="installPrompt" class="pwa-install-banner">
        <div class="pwa-install-content">
            <p>📱 Instalar app para mejor experiencia</p>
            <div class="pwa-install-buttons">
                <button @click="installApp" class="btn btn-success btn-sm">Instalar</button>
                <button @click="dismissPrompt" class="btn btn-outline-secondary btn-sm">Ahora no</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const installPrompt = ref(null)

onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        installPrompt.value = e
    })
})

const installApp = async () => {
    if (!installPrompt.value) return

    installPrompt.value.prompt()
    const { outcome } = await installPrompt.value.userChoice

    if (outcome === 'accepted') {
        console.log('Usuario aceptó instalar la PWA')
    } else {
        console.log('Usuario rechazó instalar la PWA')
    }

    installPrompt.value = null
}

const dismissPrompt = () => {
    installPrompt.value = null
}
</script>

<style scoped>
.pwa-install-banner {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    max-width: 90%;
    width: 400px;
}

.pwa-install-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.pwa-install-buttons {
    display: flex;
    gap: 10px;
}
</style>