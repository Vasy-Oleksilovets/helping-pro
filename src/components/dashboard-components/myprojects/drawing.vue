<template>
    <div class="drawing">
        <!-- Header Part of the Drawings -->
        <b-row class="p-3 d-flex">
            <b-col cols="12" sm="3" class="d-flex align-items-center"
                >Project Healthcare Facility</b-col
            >
            <b-col cols="12" sm="3">
                <div>
                    <b-row class="no-gutters">
                        <b-col class="justify-content-center d-flex">
                            <span
                                v-if="gallery_view"
                                style="color: #909090"
                                class="mr-3 d-flex align-items-center"
                                >List</span
                            >
                            <span v-else class="mr-3 d-flex align-items-center"
                                >List</span
                            >
                            <b-button-group
                                class="btn-group btn-group-toggle"
                                data-toggle="buttons"
                            >
                                <b-button
                                    type="button"
                                    class="list-view active"
                                    @click="listChange"
                                >
                                    <input
                                        type="radio"
                                        name="options"
                                        id="option1"
                                        autocomplete="off"
                                        checked
                                    />
                                    <img
                                        alt="Toogle Button"
                                        width="20"
                                        src="~@/assets/img/small-icons/toggle-button-left.png"
                                    />
                                </b-button>
                                <b-button
                                    type="button"
                                    class="gallery-view"
                                    @click="galChange"
                                >
                                    <input
                                        type="radio"
                                        name="options"
                                        id="option2"
                                        autocomplete="off"
                                    />
                                    <img
                                        alt="Toogle Button"
                                        width="20"
                                        src="~@/assets/img/small-icons/toggle-button-right.png"
                                    />
                                </b-button>
                            </b-button-group>
                            <span
                                v-if="gallery_view"
                                class="ml-3 d-flex align-items-center"
                                >Gallery</span
                            >
                            <span
                                v-else
                                style="color: #909090"
                                class="ml-3 d-flex align-items-center"
                                >Gallery</span
                            >
                        </b-col>
                    </b-row>
                </div>
            </b-col>
            <b-col class="d-flex justify-content-center">
                <div
                    role="button"
                    class="float-right d-flex align-items-center"
                >
                    <span>Download all files</span>
                    <img
                        alt="Vue logo"
                        width="20"
                        class="ml-2"
                        src="~@/assets/img/small-icons/download_all_files.png"
                    />
                </div>
            </b-col>
            <b-col class="d-flex justify-content-center">
                <div
                    role="button"
                    class="float-right d-flex align-items-center"
                >
                    <span class="mt-1">Upload</span>
                    <img
                        alt="Vue logo"
                        height="15px"
                        class="ml-2"
                        src="~@/assets/img/small-icons/upload.png"
                    />
                </div>
            </b-col>
            <b-col class="d-flex justify-content-center">
                <div
                    role="button"
                    class="float-right d-flex align-items-center"
                >
                    <span>Open new window</span>
                    <img
                        alt="Vue logo"
                        width="13"
                        class="ml-2 mr-5"
                        src="~@/assets/img/small-icons/external_link.png"
                    />
                </div>
            </b-col>
        </b-row>
        <!-- End part of the Drawings -->

        <!-- List part of the Drawings -->
        <div class="table-all">
            <div class="custom-table-header d-flex align-items-center">
                <b-col cols="1" sm="2">
                    <b-dropdown size="sm" text="Sort by" class="m-2">
                        <b-dropdown-item-button @click="sort('name')"
                            >Name</b-dropdown-item-button
                        >
                        <b-dropdown-item-button @click="sort('date_last')"
                            >Date last opened</b-dropdown-item-button
                        >
                        <b-dropdown-item-button @click="sort('date_added')"
                            >Date added</b-dropdown-item-button
                        >
                        <b-dropdown-item-button @click="sort('size')"
                            >Size</b-dropdown-item-button
                        >
                        <b-dropdown-item-button>Tag</b-dropdown-item-button>
                        <b-dropdown-item-button @click="sort('category')"
                            >Category</b-dropdown-item-button
                        >
                    </b-dropdown>
                </b-col>
                <!-- Checkbox list to list the tags -->
                <b-col sm="10">
                    <div>
                        <b-form-group>
                            <b-form-checkbox-group
                                id="checkbox-tag-list"
                                v-model="tag_search_list"
                                :options="tag_list"
                                name="tag_list_options"
                                @input="filter_by_top_tags"
                            ></b-form-checkbox-group>
                        </b-form-group>
                    </div>
                </b-col>
            </div>
            <div
                v-if="!gallery_view"
                class="custom-table-white-header d-flex pt-3 pb-3"
            >
                <b-col cols="4" sm="4">Name</b-col>
                <b-col class="border-custom-left">Tag</b-col>
                <b-col class="border-custom-left">Date Added</b-col>
                <b-col class="border-custom-left">Added By</b-col>
                <b-col class="border-custom-left">Category</b-col>
            </div>
            <div
                v-if="!gallery_view && drawings && drawings.length"
                class="table-content mt-2 mb-4"
                style="background-color: #E9E9E9"
            >
                <div
                    v-for="(drawing, index) in drawings"
                    :key="drawing.name"
                >
                    <div v-for="(page, index) in drawing.pages" :key="page.id">
                        <div :class="index % 2 == 0? 'd-flex align-items-center padding-right-20':'d-flex align-items-center padding-right-20 bg-white'">
                            <b-col cols="4" class="pt-3 pb-3 pl-5" sm="4">
                                <img
                                    alt="Vue logo"
                                    height="30"
                                    class="ml-2 pr-4"
                                    src="~@/assets/img/small-icons/archecture-design.png"
                                />
                                <span>{{ page.fileName }}</span>
                            </b-col>
                            <b-col>
                                <span
                                    v-for="category in documents.category"
                                    :key="category"
                                >
                                    <img
                                        v-if="category == 'General & Architectural'"
                                        alt="Vue logo"
                                        height="15"
                                        class="mr-1"
                                        src="~@/assets/img/small-icons/tag-general.png"
                                    />
                                    <img
                                        v-if="category == 'Structural'"
                                        alt="Vue logo"
                                        height="15"
                                        class="mr-1"
                                        src="~@/assets/img/small-icons/tag_structural.png"
                                    />
                                    <img
                                        v-if="category == 'Mechanical'"
                                        alt="Vue logo"
                                        height="15"
                                        class="mr-1"
                                        src="~@/assets/img/small-icons/tag-machnical.png"
                                    />
                                    <img
                                        v-if="category == 'Electrical'"
                                        alt="Vue logo"
                                        height="15"
                                        class="mr-1"
                                        src="~@/assets/img/small-icons/tag-electrical.png"
                                    />
                                    <img
                                        v-if="category == 'Site & Civil'"
                                        alt="Vue logo"
                                        height="15"
                                        class="mr-1"
                                        src="~@/assets/img/small-icons/tag-site.png"
                                    />
                                    <img
                                        v-if="category == 'Unassigned'"
                                        alt="Vue logo"
                                        height="15"
                                        src="~@/assets/img/small-icons/tag-unassigned.png"
                                    />
                                </span>
                            </b-col>
                            <b-col>{{page.tags}}</b-col>
                            <b-col>{{page.createdDate}}</b-col>
                            <b-col
                                class="d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <div
                                        v-for="(category, index) in drawing.category"
                                        :key="category"
                                    >
                                        <div v-if="index !== 0"> 
                                            <span v-if="category!=='General & architectural'">&amp; {{ category }}</span>
                                            <div v-else>&amp; General &amp; <br /> architectural </div>
                                        </div>
                                        <div v-else>
                                            <span v-if="category!=='General & architectural'">{{ category }}</span>
                                            <div v-else>General &amp; <br /> architectural </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-b-modal.modal-delete-modal role="button">
                                    <img
                                        alt="Vue logo"
                                        height="20"
                                        class="ml-2 pr-4"
                                        src="~@/assets/img/small-icons/pro-delete-icon.png"
                                    />
                                </div>
                            </b-col>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End part of the List Drawings -->

        <!--- Gallery part of the Drawings -->
        <b-row v-if="gallery_view" class="gallery_header no-gutters" style="display: flex">
            <b-col sm="1" cols="12" class="tag-text">Create tag</b-col>

            <b-col class="tag">
                <b-row class="no-gutters">
                    <b-col cols="1" style="display: flex">
                        <div class="dot-gen">
                            <span
                                v-if="
                                    gallery_item.category[0] ==
                                        'General & architectural'
                                "
                                style="color: white; margin: 0 auto"
                                >✓</span
                            >
                            <!-- <div v-if="gallery_item.category.includes('General & Architectural')" class="checked">&#10003;</div> -->
                        </div>
                    </b-col>
                    <b-col
                        class="gen-tag-box"
                        role="button"
                        @click="addCategory('General & architectural')"
                    >
                        <div class="tag-text">
                            <span class="gal-tag-text">Gen. &#38; Arc. </span>
                            <span class="ctl-g"> ctl + g</span>
                        </div>
                    </b-col>
                </b-row>
            </b-col>

            <b-col class="tag">
                <b-row class="no-gutters">
                    <b-col cols="1" style="display: flex">
                        <div class="dot-str">
                            <span
                                v-if="gallery_item.category[0] == 'Structural'"
                                style="color: white; margin: 0 auto"
                                >✓</span
                            >
                        </div>
                    </b-col>
                    <b-col
                        class="str-tag-box"
                        role="button"
                        @click="addCategory('Structural')"
                    >
                        <div class="tag-text">
                            <span class="gal-tag-text">Structural </span>
                            <span class="ctl-g"> ctl + g</span>
                        </div>
                    </b-col>
                </b-row>
            </b-col>

            <b-col class="tag">
                <b-row class="no-gutters">
                    <b-col cols="1" style="display: flex">
                        <div class="dot-mech">
                            <span
                                v-if="gallery_item.category[0] == 'Mechanical'"
                                style="color: white; margin: 0 auto"
                                >✓</span
                            >
                        </div>
                    </b-col>
                    <b-col
                        class="mech-tag-box"
                        role="button"
                        @click="addCategory('Mechanical')"
                    >
                        <div class="tag-text">
                            <span class="gal-tag-text">Mechanical </span>
                            <span class="ctl-g"> ctl + g</span>
                        </div>
                    </b-col>
                </b-row>
            </b-col>

            <b-col class="tag">
                <b-row class="no-gutters">
                    <b-col cols="1" style="display: flex">
                        <div class="dot-elec">
                            <span
                                v-if="gallery_item.category[0] == 'Electrical'"
                                style="color: white; margin: 0 auto"
                                >✓</span
                            >
                        </div>
                    </b-col>
                    <b-col
                        class="elec-tag-box"
                        @click="addCategory('Electrical')"
                        role="button"
                    >
                        <div class="tag-text">
                            <span class="gal-tag-text">Electrical</span>
                            <span class="ctl-g"> ctl + g</span>
                        </div>
                    </b-col>
                </b-row>
            </b-col>

            <b-col class="tag">
                <b-row class="no-gutters">
                    <b-col cols="1" style="display: flex">
                        <div class="dot-civ">
                            <span
                                v-if="
                                    gallery_item.category[0] == 'Site & civil'
                                "
                                style="color: white; margin: 0 auto"
                                >✓</span
                            >
                        </div>
                    </b-col>
                    <b-col
                        class="civ-tag-box"
                        @click="addCategory('Site')"
                        role="button"
                    >
                        <div class="tag-text">
                            <span class="gal-tag-text">Site &#38; civil </span>
                            <span class="ctl-g"> ctl + g</span>
                        </div>
                    </b-col>
                </b-row>
            </b-col>

            <b-col style="display: flex; margin: 5px;">
                <div class="tag-text" role="button">
                    <span
                        ><img
                            alt="Vue logo"
                            src="~@/assets/img/small-icons/trashcan_icon.png"
                    /></span>
                    <span style="color: #D60000"> Delete File</span>
                </div>
            </b-col>
        </b-row>

        <div v-if="gallery_view">
            <b-row
                v-if="gallery_view && gallery_item.length !== 0"
                class="no-gutters d-flex justify-content-center"
            >
                <b-col
                    cols="10"
                    class="align-content-center all-triangles-container"
                >
                    <carousel
                        class="d-flex align-items-center mt-2"
                        :items="1"
                        :margin="20"
                    >
                        <template slot="prev">
                            <div class="prev">
                                <img
                                    alt="Vue logo"
                                    width="15"
                                    class="mr-1 opposite-img"
                                    src="~@/assets/img/small-icons/slider-next.png"
                                />
                            </div>
                        </template>
                        <div
                            v-for="(document, index) in documents"
                            :key="document.file_name"
                            v-on:click="gallery_focus(index)"
                        >
                            <img
                                alt="Vue logo"
                                class="mr-1"
                                src="~@/assets/img/drawing1.png"
                            />
                            <div
                                v-if="
                                    document.category[0] ===
                                        'General & architectural'
                                "
                                class="triangle triangle_tl_gen"
                            ></div>
                            <div
                                v-if="document.category[0] === 'Structural'"
                                class="triangle triangle_tl_str"
                            ></div>
                            <div
                                v-if="document.category[0] === 'Mechanical'"
                                class="triangle triangle_tl_mech"
                            ></div>
                            <div
                                v-if="document.category[0] === 'Electrical'"
                                class="triangle triangle_tl_elec"
                            ></div>
                            <div
                                v-if="document.category[0] === 'Site & Civil'"
                                class="triangle triangle_tl_civ"
                            ></div>
                        </div>
                        <template class="next-icon" slot="next">
                            <div class="next">
                                <img
                                    alt="Vue logo"
                                    width="15"
                                    class="mr-1"
                                    src="~@/assets/img/small-icons/slider-next.png"
                                />
                            </div>
                        </template>
                    </carousel>
                </b-col>
            </b-row>
            <div style="margin: 30px 40px 10px 20px">
                <carousel
                    class="d-flex align-items-center"
                    :items="5"
                    :margin="20"
                >
                    <template slot="prev">
                        <div class="prev">
                            <img
                                alt="Vue logo"
                                width="15"
                                class="mr-1 opposite-img"
                                src="~@/assets/img/small-icons/slider-next.png"
                            />
                        </div>
                    </template>
                    <div
                        v-for="(document, index) in documents"
                        :key="document.file_name"
                        v-on:click="gallery_focus(index)"
                    >
                        <img
                            alt="Vue logo"
                            class="mr-1"
                            src="~@/assets/img/drawing2.png"
                        />
                        <div
                            v-if="
                                document.category[0] ===
                                    'General & architectural'
                            "
                            class="triangle triangle_tl_gen small-size"
                        ></div>
                        <div
                            v-if="document.category[0] === 'Structural'"
                            class="triangle triangle_tl_str small-size"
                        ></div>
                        <div
                            v-if="document.category[0] === 'Mechanical'"
                            class="triangle triangle_tl_mech small-size"
                        ></div>
                        <div
                            v-if="document.category[0] === 'Electrical'"
                            class="triangle triangle_tl_elec small-size"
                        ></div>
                        <div
                            v-if="document.category[0] === 'Site & Civil'"
                            class="triangle triangle_tl_civ small-size"
                        ></div>
                        <div class="gallery-font">{{ document.file_name }}</div>
                    </div>
                    <template class="next-icon" slot="next">
                        <div class="next">
                            <img
                                alt="Vue logo"
                                width="15"
                                class="mr-1"
                                src="~@/assets/img/small-icons/slider-next.png"
                            />
                        </div>
                    </template>
                </carousel>
            </div>
        </div>
        <!-- End part of the Gallery Drawings -->

        <b-modal id="modal-delete-modal" centered>
            <template v-slot:modal-header="{}">
                <span @click="close()"></span>
            </template>
            <div class="text-center project-detail">
                <div class="mb-3">
                    Are you sure you would like to delete this file?
                </div>
                <div>This will move it to the trash folder.</div>
            </div>
            <template v-slot:modal-footer="{ ok }">
                <div
                    class="text-center mb-4"
                    style="margin-left: auto; margin-right: auto;"
                >
                    <b-btn
                        class="dialog-btn-style mr-5 second-btn-style"
                        @click="ok()"
                        >Yes</b-btn
                    >
                    <b-btn class="dialog-btn-style first-btn-style">No</b-btn>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel';
import ProjectProxy from '@/proxies/ProjectProxy.js';
export default {
    props: ['role', 'project_id'],
    data() {
        return {
            documents: [
                {
                    id: 0,
                    file_name: 'Drawing 1.pdf',
                    date_added: '01/01/2020',
                    added_by: 'Roger Williams',
                    category: ['Structural'],
                },
                {
                    id: 1,
                    file_name: 'Drawing 2.pdf',
                    date_added: '01/01/2020',
                    added_by: 'Roger Williams',
                    category: ['Mechanical', 'Electrical'],
                },
                {
                    id: 2,
                    file_name: 'Drawing 3.pdf',
                    date_added: '01/01/2020',
                    added_by: 'Roger Williams',
                    category: ['General & architectural'],
                },
                {
                    id: 3,
                    file_name: 'Drawing 4.pdf',
                    date_added: '01/01/2020',
                    added_by: 'Roger Williams',
                    category: ['Site & Civil'],
                },
                {
                    id: 4,
                    file_name: 'Drawing 5.pdf',
                    date_added: '01/01/2020',
                    added_by: 'Roger Williams',
                    category: [''],
                },
                {
                    id: 5,
                    file_name: 'Drawing 6.pdf',
                    date_added: '01/01/2020',
                    added_by: 'Roger Williams',
                    category: ['Mechanical', 'Structural'],
                },
                {
                    id: 6,
                    file_name: 'Drawing 7.pdf',
                    date_added: '01/01/2020',
                    added_by: 'Roger Williams',
                    category: ['General & architectural'],
                },
                {
                    id: 7,
                    file_name: 'Drawing 8.pdf',
                    date_added: '01/01/2020',
                    added_by: 'Roger Williams',
                    category: ['Site & Civil'],
                },
            ],
            temp_documents: [],
            gallery_item: [],
            gallery_view: false,
            //the list for display tags
            tag_list: [
                {
                    text: 'General & architectural',
                    value: 'General & architectural',
                    className: 'triangle_tl_gen',
                },
                {
                    text: 'Structural',
                    value: 'Structural',
                    className: 'triangle_tl_str',
                },
                {
                    text: 'Mechanical',
                    value: 'Mechanical',
                    className: 'triangle_tl_mech',
                },
                {
                    text: 'Electrical',
                    value: 'Electrical',
                    className: 'triangle_tl_elec',
                },
                {
                    text: 'Site & civil',
                    value: 'Site & civil',
                    className: 'triangle_tl_civ',
                },
                { text: 'Master list', value: 'Master list', className: '' },
            ],
            tag_search_list: [],
            drawings: []
        };
    },
    name: 'Drawing',
    components: { carousel },
    methods: {
        filter_by_category(category) {
            switch (category) {
                case 'general':
                    // this.documents = this.temp_documents.filter(document => document.category.includes('General & Architectural'))
                    break;
                case 'structural':
                    // this.documents = this.temp_documents.filter(document => document.category.includes('Structural'));
                    break;
                case 'mechanical':
                    // this.documents = this.temp_documents.filter(document => document.category.includes('Mechanical'));
                    break;
                case 'electrical':
                    // this.documents = this.temp_documents.filter(document => document.category.includes('Electrical'));
                    break;
                case 'site':
                // this.documents = this.temp_documents.filter(document => document.category.includes('Site & Civil'));
                default:
                    break;
            }
        },

        arrayContainsArray(superset, subset) {
            if (0 === subset.length) {
                return false;
            }
            superset = superset.map(function(value) {
                return value.toUpperCase();
            });
            return subset.every(function(value) {
                return superset.indexOf(value.toUpperCase()) >= 0;
            });
        },

        //Filter by to tags
        filter_by_top_tags() {
            if (this.tag_search_list.length === 0) {
                this.documents = this.temp_documents;
            } else {
                this.documents = [];
                for (var key in this.temp_documents) {
                    if (
                        this.arrayContainsArray(
                            this.temp_documents[key].category,
                            this.tag_search_list
                        )
                    )
                        this.documents.push(this.temp_documents[key]);
                }
            }
        },

        sort(unit) {
            switch (unit) {
                case 'name':
                    this.documents = this.temp_documents.sort((a, b) =>
                        a.file_name > b.file_name ? 1 : -1
                    );
                    break;
                case 'date_added':
                    this.documents = this.temp_documents.sort((a, b) =>
                        a.date_added > b.date_added ? 1 : -1
                    );
                    break;
                default:
                    break;
            }
        },

        listChange() {
            this.gallery_view = false;
            //alert(gallery_view);
        },
        galChange() {
            this.gallery_view = true;
            //alert(gallery_view)
        },

        gallery_focus(index) {
            this.gallery_item = this.documents[index];
            //alert(this.gallery_item.file_name);
        },

        //Insert Category when someone click the top button
        //General & architectural
        addCategory(category_name) {
            switch (category_name) {
                case 'General & architectural':
                    this.gallery_item.category[0] = 'General & architectural';
                    this.$forceUpdate();
                    break;
                case 'Structural':
                    this.gallery_item.category[0] = 'Structural';
                    this.$forceUpdate();
                    break;
                case 'Mechanical':
                    this.gallery_item.category[0] = 'Mechanical';
                    this.$forceUpdate();
                    break;
                case 'Electrical':
                    this.gallery_item.category[0] = 'Electrical';
                    this.$forceUpdate();
                    break;
                case 'Site':
                    this.gallery_item.category[0] = 'Site & civil';
                    this.$forceUpdate();
                    break;
                default:
                    break;
            }
        },
        getProject(){
            // TODO
            new ProjectProxy().find(this.project_id).then((response) => {
                this.project = response.project;
                this.drawings = response.drawings;
                this.documents = response.documents;
                this.photos = response.photos;
                this.custom_character = this.project.buildingType.name;
                this.temp_documents = this.documents;
                this.gallery_item = this.documents[0];
            })
            .catch(error => {
            });
        }
    },
    created() {
        this.getProject();
    },
};
</script>

<style lang="css" scoped>

.all_triangles_container {
    position: relative;
    overflow: hidden;
}

.triangle {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
}

.triangle_tl_none {
    border-width: 0 0 70px 70px;
    border-color: transparent transparent transparent #E3E3E3;
    left: 0;
    top: 0;
}

.triangle_tl_gen {
    border-width: 0 0 70px 70px;
    border-color: transparent transparent transparent #60C4EA;
    left: 0;
    top: 0;
}

.small-size {
    border-width: 0 0 30px 30px !important;
}

.triangle_tl_str {
    border-width: 0 0 70px 70px;
    border-color: transparent transparent transparent #4B144B;
    left: 0;
    top: 0;
}

.triangle_tl_mech {
    border-width: 0 0 70px 70px;
    border-color: transparent transparent transparent #E3B44C;
    left: 0;
    top: 0;
}
.triangle_tl_elec {
    border-width: 0 0 70px 70px;
    border-color: transparent transparent transparent #5BB381;
    left: 0;
    top: 0;
}
.triangle_tl_civ {
    border-width: 0 0 70px 70px;
    border-color: transparent transparent transparent #CD375C;
    left: 0;
    top: 0;
}



.dot-gen {
    margin: auto;
    height: 16px;
    width: 16px;
    background-color: #60C4EA;
    border-radius: 8px;
    display: flex;
}
.dot-str {
    margin: auto;
    height: 16px;
    width: 16px;
    background-color: #4B144B;
    border-radius: 8px;
    display: flex;
}
.dot-mech {
    margin: auto;
    height: 16px;
    width: 16px;
    background-color: #E3B44C;
    border-radius: 8px;
    display: flex;
}
.dot-elec {
    margin: auto;
    height: 16px;
    width: 16px;
    background-color: #5BB381;
    border-radius: 50%;
    display: flex;
}
.dot-civ {
    margin: auto;
    height: 16px;
    width: 16px;
    background-color: #CD375C;
    border-radius: 50%;
    display: flex;
}


.tag {
    display: inline-block;
    margin: 5px;
}
.gen-tag-box {
    background-color: #60C4EA;
    height: 40px;
    width: 200px;
    text-align: center;
    display: flex;
    margin-left: 8px;
}
.str-tag-box {
    background-color: #4B144B;
    height: 40px;
    width: 200px;
    text-align: center;
    display: flex;
    margin-left: 8px;
}
.mech-tag-box {
    background-color: #E3B44C;
    height: 40px;
    width: 200px;
    text-align: center;
    display: flex;
    margin-left: 8px;
}
.elec-tag-box {
    background-color: #5BB381;
    height: 40px;
    width: 200px;
    text-align: center;
    display: flex;
    margin-left: 8px;
}
.civ-tag-box {
    background-color: #CD375C;
    height: 40px;
    width: 200px;
    text-align: center;
    display: flex;
    margin-left: 8px;
}

.list-view {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    width: 80px;
    height: 40px;
    background-color: #f9f9f9 !important;
    border-color: #FFFFFF;
}
.list-view:active, .active {
    background-color: #213046 !important;
}

.gallery-view {
    border-color: #FFFFFF;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    width: 80px;
    height: 40px;
    background-color: #f9f9f9 !important;
}

.btn-group-toggle {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}

.gallery-view:active, .active {
    background-color: #213046 !important;
}

.gallery_select {
    margin: 18px;
}
.gallery_header {
    background-color: #FFFFFF;
}

.gal-tag-text {
    color: #FFFFFF;
    margin: auto;
    vertical-align: middle;
}
.tag-text {
    margin: auto;
    text-align: center;
}
.ctl-g {
    color: #E3E3E3;
    vertical-align: middle;
}

.checked {
    margin: auto;
    color: #f9f9f9;
}

.custom-table-header {
    background-color: #0C2340;
    color: white;
    padding: 10px 20px 10px 0px;
    min-width: 1000px !important;
}

.custom-table-white-header {
    background-color: white;
    padding: 10px 20px 10px 0px;
    border-bottom: 1px solid #C9C9C9;
    min-width: 1000px !important;
}

.border-custom-left {
    border-left: 1px solid #C9C9C9;
    font-size: 1.05em;
}

.padding-right-20 {
    padding-right: 20px;
}

.table-content {
    min-width: 1000px !important;
}

.form-group {
    margin-bottom: 0rem !important;
}

.dialog-btn-style {
    padding: 7px 40px 7px 40px;
    max-width: 100px;
    border-radius: 8px;
    border-width: 0;
}

.second-btn-style {
    background-color: #83afdb;
}

.first-btn-style {
    background-color: #19293e;
}

.btn-style1{
    background-color: white;
    color: black;
    padding: 4px 8px 4px 8px;
    border-radius: 1px;
}
.untagged {
    position: absolute;
    top: 20px;
    left: 15px;
}

.next-icon {
    margin: auto 0;
}

.opposite-img {
    transform: rotate(180deg);
}

@media (max-width: 800px) {
    .table-all {
        overflow: auto;
        width: auto;
    }
    .gallery-font {
        font-size: 8px;
    }
    .small-size {
        border-width: 0 0 10px 10px !important;
    }
}
</style>
