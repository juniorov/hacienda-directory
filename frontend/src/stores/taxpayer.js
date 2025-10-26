import { defineStore } from 'pinia';

export const useTaxpayerStore = defineStore('taxpayer', {
    state: () => ({
        taxpayer: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchTaxpayer(taxpayerDNI) {
            this.loading = true;
            this.error = null;
            this.taxpayer = null;

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/${taxpayerDNI}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.taxpayer = await data.data;
            } catch (error) {
                this.error = true;
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                this.loading = false;
            }
        },
    },
});