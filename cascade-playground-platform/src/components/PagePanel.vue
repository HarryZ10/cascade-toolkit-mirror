<!-- eslint-disable max-len -->
<template>
  <div class="container">
        <form @submit.prevent="handleSubmit">
            <label
                for="textAreaInput"
                id="submitLabel"
            >
                Enter Text (separated by newlines)
            </label>
            <br/><br/>

            <textarea
                id="textAreaInput"
                v-model="form.textAreaInput"
                placeholder="Enter text here">
            </textarea>
            <br/><br/>

            <p for="date" id="submitLabel">Enter Timeframe</p>
            <VueDatePicker
                range
                v-model="form.date"
                class="dp-date-menu"
                @change="onDateChange"
                :enable-time-picker="false"
            />
            <br/><br/>

            <button class="btn btn-primary" type="submit">
                Fetch Page Details
            </button>
        </form>

        <div class="container" v-if="pagesResponse && pagesResponse.length">
            <div class="accordion accordion-flush" id="accordionExample">
                <div class="accordion-item"
                    v-for="(item, index) in pagesResponse"
                    :key="index"
                >
                    <h2 class="accordion-header" :id="`heading${index}`">
                        <button class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                :data-bs-target="`#collapse${index}`"
                                aria-expanded="true"
                                :aria-controls="`collapse${index}`"
                        >
                            {{ item.rel_path }}
                        </button>
                    </h2>

                    <div
                        :id="`collapse${index}`"
                        class="accordion-collapse collapse"
                        :aria-labelledby="`heading${index}`"
                    >
                        <div class="accordion-body">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">URL</th>
                                        <td>
                                            <a
                                                :href="item.url"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Live
                                                <svg
                                                width="14"
                                                style="margin-left: 0.5rem; margin-bottom: 0.2rem;"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                >
                                                        <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Cascade Link</th>
                                        <td>
                                            <a
                                                :href="item.cascadeLink"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View in CMS
                                                <svg
                                                width="14"
                                                style="margin-left: 0.5rem; margin-bottom: 0.2rem;"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                >
                                                        <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Last Modified</th>
                                        <td>{{ formatDate(item.lastModifiedDate) }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Last Edited Block</th>
                                        <td>{{ item.lastEditedBlock }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Editor</th>
                                        <td>{{ item.editor }}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div
                                v-if="item.modifiedBlocks && item.modifiedBlocks.length > 0"
                            >
                                <h4>Modified Blocks</h4>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Block Path</th>
                                            <th scope="col">Last Modified</th>
                                            <th scope="col">Editor</th>
                                            <th scope="col">Link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="block in item.modifiedBlocks"
                                            :key="block.blockId"
                                        >
                                            <td>{{ block.blockPath }}</td>
                                            <td>{{ formatDate(block.lastModifiedDate) }}</td>
                                            <td>{{ block.editor }}</td>
                                            <td>
                                                <a
                                                    :href="block.cascadeLink"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View in CMS
                                                    <svg
                                                    width="14"
                                                    style="margin-left: 0.5rem; margin-bottom: 0.2rem;"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                    >
                                                            <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p style="margin-top: 4rem" v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    components: {
        VueDatePicker,
    },
    name: 'PagePanel',
    data() {
        return {
            form: {
                date: [
                    new Date(new Date().setDate(new Date().getDate() - 7)),
                    new Date(),
                ],
                textAreaInput: '',
            },
            pagesResponse: {},
            pageUrls: [],
            error: null,
        };
    },
    methods: {
        async fetchPageDetails() {
            try {
                const settings = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'pageUrls': this.pageUrls,
                        'startTime': this.form.date[0],
                        'endTime': this.form.date[1],
                    }),
                };
                const response = await fetch(
                    'http://localhost:3001/audit',
                    settings,
                );

                if (response.ok) {
                    const data = await response.json();
                    this.pagesResponse = data ?? [];
                    console.log(this.pagesResponse);
                    if (this.pagesResponse.length === 0) {
                        this.error = 'Query has no results.';
                    }
                } else {
                    alert('Something went wrong!');
                }
            } catch (error) {
                this.error = error.toString();
            }
        },

        onDateChange() {
            this.$emit('date-change', this.form.date);
        },

        handleSubmit() {
            this.processTextAreaInput();
            this.fetchPageDetails();
        },

        processTextAreaInput() {
            this.pageUrls = this.form.textAreaInput
                .split('\n')
                .filter((l) => l.trim() !== '');
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZone: 'America/Los_Angeles',
                timeZoneName: 'short',
            });
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

#textAreaInput {
    width: 30%;
}

</style>
