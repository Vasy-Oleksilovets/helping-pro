<template>
    <b-container class="form-section">
        <b-row class="no-gutters">
            <b-col cols="12" lg="3" class="form-section">
                <b-row class="no-gutters">
                    <b-col cols="12" class="form-section">
                        <p class="char-sub-title">
                            Position Applying For
                            <span class="form-asterisk">*</span>
                        </p>
                    </b-col>
                </b-row>
                <b-row class="no-gutters">
                    <b-col cols="12" lg="12" class="form-section">
                        <b-row
                            class="no-gutters field-box d-flex justify-space-between"
                            style="border: none; width: 100%"
                        >
                            <b-col class="form-section" cols="12">
                                <b-form-select v-on:change="addPosition" v-model="send_position.position_applying_for" v-bind:blur="showPositions()">
                                    <option v-for="job_title in job_title" v-bind:key="job_title.value" v-bind:value="job_title.ID">
                                        {{ job_title.text }}
                                    </option>
                                </b-form-select>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <div
                    v-if="submitted3 && !send_position.position_applying_for"
                    style="align-items: center"
                >
                    <img
                        style="width: 15px; margin-bottom:1px;margin-right:4px;"
                        alt="Vue logo"
                        src="~@/assets/img/warning-icon.png"
                    />
                    <span style="color:red">Select position apply for</span>
                </div>
            </b-col>
            <b-col cols="12" lg="3" class="form-section">
                <b-row class="no-gutters">
                    <b-col cols="12" class="form-section">
                        <p class="char-sub-title">
                            Area of expertise
                            <span class="form-asterisk">*</span>
                        </p>
                    </b-col>
                </b-row>
                <b-row class="no-gutters">
                    <b-col cols="12" lg="12" class="form-section">
                        <b-row
                            class="no-gutters field-box d-flex justify-space-between"
                            style="border: none; width: 100%"
                        >
                            <b-col class="form-section" cols="12">
                                <b-form-select @change="selectExpertise($event)" v-model="send_position.area_expertise">
                                    <option v-for="expertise in expertises" v-bind:key="expertise.value" v-bind:value="expertise.ID"> {{ expertise.field }}</option>
                                </b-form-select>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <div
                    v-if="submitted3 && !send_position.area_expertise"
                    style="align-items: center"
                >
                    <img
                        style="width: 15px; margin-bottom:1px;margin-right:4px;"
                        alt="Vue logo"
                        src="~@/assets/img/warning-icon.png"
                    />
                    <span style="color:red"
                        >Select position area of expertise</span
                    >
                </div>
            </b-col>
            <b-col cols="12" lg="3" class="form-section">
                <b-row class="no-gutters">
                    <b-col cols="12" class="form-section">
                        <p class="char-sub-title">
                            Skills <span class="form-asterisk">*</span>(Select
                            all that apply)
                        </p>
                    </b-col>
                </b-row>
                <b-row class="no-gutters">
                    <b-col cols="11" lg="12" class="form-section">
                        <b-row
                            v-for="row in fitSkills()"
                            v-bind:key="row.index"
                            class="align-items-center"
                        >
                            <b-col
                                lg="12"
                                v-for="skill in row"
                                v-bind:key="skill.value"
                                v-bind:value="skill.ID"
                            >
                                <div class="mt-2 d-flex align-items-center">
                                    <input
                                        v-model="send_position.skills"
                                        @change="checkSkills"
                                        v-bind:value="skill.ID"
                                        type="checkbox"
                                        class="mr-1"
                                    />
                                    <div>{{ skill.value }}</div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <!-- <b-row class="no-gutters">
                    <b-col cols="12" class="form-section">
                        <p class="char-sub-title">Availability</p>
                    </b-col>
                </b-row>
                <b-row class="no-gutters">
                    <b-col cols="11" lg="7" class="form-section">
                        <b-row class="no-gutters field-box d-flex justify-space-between" style="border: none; width: 100%">
                            <b-col class="form-section" cols="11">
                                <b-form-select v-on:change="addAvailability" v-model="availability">
                                    <option v-for="availability_opts in availability_opts" v-bind:key="availability_opts.value"  v-bind:value="availability_opts.text" >
                                            {{ availability_opts.text }}
                                    </option>
                                </b-form-select>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row> -->
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'Positions',
    props: {
        submitted3: Boolean,
        send_position1: Object
    },
    data() {
        return {
            //Selected Position
            send_position: {
                area_expertise: '',
                position_applying_for: '',
                skills: [],
            },
            selected_expertise_index: -1,

            myPositions: [],
            position: '',
            positionsVisible: false,
            job_title: [
                { ID: 1, text: 'Certified Cost Engineer' },
                { ID: 2, text: 'Certified Cost Estimator' },
                { ID: 3, text: 'Certified Cost Surveyor' },
            ],
            availability_opts: [
                { ID: 1, text: 'Full time' },
                { ID: 2, text: 'Part time' },
                { ID: 3, text: 'Contractor' },
            ],
            availability: '',
            myAvailabilities: [],
            expertises: [
                {
                    ID: 1,
                    field: 'General/Architectural',
                    skills: [
                        { ID: 1, value: 'Roof' },
                        { ID: 2, value: 'Exterior Closure' },
                        { ID: 3, value: 'Finishes' },
                        { ID: 4, value: 'Interior Walls' },
                        { ID: 5, value: 'Doors and Windows' },
                        { ID: 6, value: 'Thermal and Moisture Protection' },
                        { ID: 7, value: 'Misc. Metals' },
                        { ID: 8, value: 'Finish Carpentry' },
                        { ID: 9, value: 'Specialties' },
                        { ID: 10, value: 'Furnishings and Equipment' },
                    ],
                },
                {
                    ID: 2,
                    field: 'Structural',
                    skills: [
                        { ID: 1, value: 'Standard ' },
                        { ID: 2, value: 'Special/Deep Foundations' },
                        { ID: 3, value: 'Concrete Framing' },
                        { ID: 4, value: 'Structural Steel Framing' },
                        { ID: 5, value: 'Masonry Framing' },
                        { ID: 5, value: 'Wood Framing' },
                    ],
                },
                {
                    ID: 3,
                    field: 'Mechanical',
                    skills: [
                        { ID: 1, value: 'HVAC' },
                        { ID: 2, value: 'Plumbing' },
                        { ID: 3, value: 'Fire Protection' },
                    ],
                },
                {
                    ID: 4,
                    field: 'Electrical',
                    skills: [
                        { ID: 1, value: 'Power and Lighting' },
                        { ID: 2, value: 'Low Voltage' },
                        { ID: 3, value: 'Site Distribution and Lighting' },
                    ],
                },
                {
                    ID: 5,
                    field: 'State/Civil',
                    skills: [
                        { ID: 1, value: 'Clearing and Earthworks' },
                        { ID: 2, value: 'Site and Building Demolitions' },
                        { ID: 3, value: 'Drainage' },
                        { ID: 4, value: 'Utilities' },
                        { ID: 5, value: 'Landscaping' },
                    ],
                },
            ],
        };
    },

    methods: {
        chunkArray(array, size) {
            let result = [];
            let arrayCopy = [...array];
            while (arrayCopy.length > 0) {
                result.push(arrayCopy.splice(0, size));
            }
            return result;
        },
        addPosition() {
            var pos = this.position;
            if (this.myPositions.includes(pos) == false) {
                this.myPositions = [...this.myPositions, pos];
            }
            this.setPositions();
            this.$emit('position', this.send_position);
        },
        addAvailability() {
            var avail = this.availability;
            if (this.myAvailabilities.includes(avail) == false) {
                this.myAvailabilities = [...this.myAvailabilities, avail];
            }
        },
        delExp(id) {
            this.$delete(this.myPositions, id);
        },
        setPositions() {
            var positions = this.myPositions;
            this.$emit('position', this.send_position);
        },
        showPositions() {
            if (this.myPositions.length == 0) {
                this.positionsVisible = false;
            } else {
                this.positionsVisible = true;
            }
        },
        selectExpertise(event) {
            this.send_position.area_expertise = event;
            this.fitSkills;
            this.$emit('position', this.send_position);
        },
        //If someone select one of the area of expertise field, this function will return all the skills for that area.
        fitSkills() {
            if (this.send_position.area_expertise == -1) return [];
            else {
                for (let expertise of this.expertises) {
                    if (this.send_position.area_expertise == expertise.ID) {
                        let result = this.chunkArray(expertise.skills, 1);
                        return result;
                    }
                }
            }
        },
        //Method to send the data to the parent component
        checkSkills() {
            this.$emit('position', this.send_position);
        },
    },
    mounted() {
        this.fitSkills();
    },
    created(){
        if(Object.keys(this.send_position).length>0){
            this.send_position.area_expertise = this.send_position1.area_expertise;
            this.send_position.position_applying_for = this.send_position1.position_applying_for;
            this.send_position.skills = this.send_position1.skills;
        }
    }
};
</script>

<style scoped>
.custom-select {
    height: 100%;
    width: 100%;
    border: 1.5px solid #c9c9c9;
    background: #fff
        url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2  -1h4zm0 5L0 1h4z'/%3E%3C/svg%3E")
        no-repeat right 0.75rem center/8px 10px;
}

.select-arrow {
    margin-top: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: #c9c9c9 transparent transparent transparent;
}

.select-arrow:hover {
    transform: rotate(180deg);
    transition-duration: 0.5s;
}

.field-box {
    border: 1.5px solid #c9c9c9;

    border-radius: 3px;

    width: 90%;
    height: 40px;
}

.reg-select-box {
    position: relative;
    border-radius: 3px;
    margin: 0;

    width: 110%;
    height: 40px;

    padding-left: 5px;
}

.reg-select-box:hover {
    caret-color: #c9c9c9;
}

.field-box:hover .select-arrow {
    transform: rotate(180deg);
    transition-duration: 0.5s;
}

.positions-selections {
    list-style-type: none;
    width: 300px;
    border: 1.5px solid #c9c9c9;

    overflow-x: hideen;
    padding-left: 0px;
}

.positions-item {
    background: #f3f3f3;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    overflow-x: hidden;
    height: 100%;
}
</style>
