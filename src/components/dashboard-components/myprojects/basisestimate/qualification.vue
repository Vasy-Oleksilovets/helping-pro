<template>
    <div class="introduction">
        <b-row class="no-gutters introduction-header">
            <b-col class="text-center"
                ><span class="title mr-2">Company name:</span
                ><span>Google Healthcare</span></b-col
            >
            <b-col class="text-center"
                ><span class="title mr-2">Building category:</span
                ><span>Warehouse</span></b-col
            >
            <b-col class="text-center"
                ><span class="title mr-2">Type of work:</span
                ><span>Conceptual</span></b-col
            >
        </b-row>
        <div class="content-card">
            <div
                v-for="(data, index) in qualificationData"
                :key="index"
                class="section"
            >
                <div class="title mb-2 d-flex justify-content-between">
                    <div>
                        <span class="mr-1">5.{{ index + 1 }}</span
                        ><span>{{ data.title }}</span>
                        <input
                            v-if="data.type == 'new'"
                            type="text"
                            v-model="newData"
                            placeholder="Type new field name"
                            class="cell-background"
                        />
                        <img
                            v-if="data.type == 'new'"
                            alt="Pencil icon"
                            class="mr-5"
                            src="~@/assets/img/small-icons/profile-edit-pencil.png"
                        />
                        <img
                            v-if="data.type == 'new'"
                            alt="Move icon"
                            src="~@/assets/img/small-icons/move-icon.png"
                        />
                        <span v-if="data.type == 'new'" class="text-danger ml-1"
                            >CLICK AND DRAG</span
                        >
                    </div>
                    <div>
                        <img
                            @click="deleteData(index)"
                            alt="Vue logo"
                            height="20"
                            class="ml-2 pr-4"
                            src="~@/assets/img/small-icons/pro-delete-icon.png"
                        />
                    </div>
                </div>
                <b-form-textarea
                    id="textarea-small"
                    size="sm"
                    rows="7"
                ></b-form-textarea>
                <b-row class="no-gutters">
                    <b-col sm="10">
                        <hr />
                        <div class="m-3 p-4 border rounded">
                            <b-button
                                class="btn-style d-flex align-items-center justify-content-around rounded"
                                style="background-color: #0C2340"
                                ><img
                                    class="mr-3"
                                    alt="Vue logo"
                                    src="~@/assets/img/small-icons/reply.png"
                                />Leave comment</b-button
                            >
                        </div>
                    </b-col>
                    <b-col sm="2" class="text-center mt-3">
                        <b-button
                            @click="saveData(index)"
                            class="align-items-center rounded"
                            >Save changes</b-button
                        >
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Qualification',
    props: ['qualificationData'],
    components: {},
    data() {
        return {
            newData: '',
        };
    },
    methods: {
        saveData(index) {
            this.qualificationData[index].title = this.newData;
            this.qualificationData[index].type = 'old';
        },
        deleteData(index) {
            this.qualificationData.splice(index, 1);
        },
    },
    created() {},
    updated() {},
};
</script>

<style scoped>
.introduction {
    font-weight: normal;
    font-size: 0.9em;
}

.title {
    font-weight: bold;
}

.content-card {
    margin: 20px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    min-height: 80vh;
    padding: 25px;
}

.introduction-header {
    background-color: #cddff0;
    padding: 4px;
}

.cell-background {
    border: 0px solid white;
    padding: 5px;
}
</style>
