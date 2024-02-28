<template>
  <div>
        <form @submit.prevent="handleSubmit">
            <label for="pageId" id="submitLabel">Enter Page ID</label>
            <br/><br/>
            <input id="pageId" v-model="form.pageId" type="text" required>
            <br/><br/>

            <p for="date" id="submitLabel">Enter Timeframe</p>
            <VueDatePicker
                range
                v-model="form.date"
                class="dp-date-menu"
                @change="onDateChange"
                :enable-time-picker="false"
            />

        <button
            class="btn btn-primary"
            type="submit"
        >
            Fetch Page Details
        </button>
        </form>

        <div class="container" v-if="pageDetails.pagePath">
            <h4>
                <a
                    target="_blank"
                    rel="noreferrer"
                    :href=pageDetails.pagePath
                >
                    Page
                </a>
            </h4>
            <pre>{{ JSON.stringify(pageDetails, null, 2) }}</pre>
        </div>

        <div class="container" v-if="blocks">
            <div
                v-for="block in blocks"
                :key="block.blockId"
            >
                <h4>Block: {{block.blockPath}}</h4>
                <pre>{{ JSON.stringify(block, null, 2) }}</pre>
            </div>
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
            blocks: [],
            error: null,
        };
    },
    methods: {
        async fetchPageDetails() {
            try {
                const response = await fetch(
                    `http://localhost:3001/page/${this.form.pageId}?startTime=${this.form.date[0]}&endTime=${this.form.date[1]}`,
                );

                if (response.ok) {
                    const data = await response.json();
                    this.pageDetails = data;
                    this.blocks = this.pageDetails.modifiedBlocks;
                    console.log(this.blocks);
                } else {
                    alert('Something went wrong!');
                }
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

.container {
    margin-top: 20px;
}
.dp-date-menu {
  width: 30%;
  margin: 0 auto;
  padding-bottom: 20px;
}

#submitLabel {
    padding-right: 10px;
}

pre {
    text-align: left !important;
}

</style>
