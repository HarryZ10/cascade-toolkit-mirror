<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="pageId">Enter Page ID: </label>
      <input id="pageId" v-model="form.pageId" type="text" required><br/><br/>

      <label for="date">Enter Timeframe: </label>
      <VueDatePicker
        range
        v-model="form.date"
        class="dp-date-menu"
        @change="onDateChange"
        :enable-time-picker="false"
      />

      <button type="submit">Fetch Page Details</button>
    </form>

    <div v-if="pageDetails.pagePath">
      <p>{{ pageDetails.pagePath }}</p>
      <p>Last modified by: {{ pageDetails.editor }}</p>
      <p>Last modified date: {{ pageDetails.lastModifiedDate }}</p>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    // eslint-disable-next-line object-curly-spacing
    components: { VueDatePicker },
    name: 'PagePanel',
    data() {
        return {
            form: {
                pageId: '',
                date: [
                    new Date(new Date().setDate(new Date().getDate() - 7)),
                    new Date(),
                ],
            },
            pageDetails: {},
            error: null,
        };
    },
    methods: {
        async fetchPageDetails() {
            try {
                const response = await fetch(
                    `http://localhost:3001/page/${this.form.pageId}?startTime=${this.form.date[0]}&endTime=${this.form.date[1]}`,
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                this.pageDetails = data;
            } catch (error) {
                this.error = error.toString();
            }
        },
        onDateChange() {
            this.$emit('date-change', this.date);
        },

        handleSubmit() {
            this.fetchPageDetails();
        },
    },
};

</script>

<style scoped>

.dp-date-menu {
  width: 50%;
  margin: 0 auto;
  padding-bottom: 20px;
}

</style>
