<template>
    <b-container class="form-section">
        <b-row class="no-gutters">
            <p class="char-sub-title">
                Certifications & Credentials
                <span class="form-asterisk">*</span>
            </p>
            <p>
                Certification is a formal process whereby an organization
                recognized by Construction Check can provide confirmation of an
                individual’s certification. Certification differs from licensing
                in that licenses are permissions granted by a government entity
                for a person to practice within its regulatory boundaries.
                Certification also differs from a “certificate” that documents
                the successful completion of a training or education program.
            </p>
            <p style="color: red">
                You will be required to upload your certification document(s)
                after your account has been created.
            </p>
        </b-row>
        <b-row class="inputArea no-gutters" style="margin-bottom: 10px">
            <b-col cols="11" lg="6" class="form-section">
                <b-row
                    b-row
                    style="margin-top: 10px; margin-left: 0px; margin-right: 0px;"
                >
                    <p class="char-sub-title">
                        Select your certification (Select all that apply)
                        <span class="form-asterisk">*</span>
                    </p>
                </b-row>
            </b-col>
            <b-col cols="11" lg="6" class="form-section">
                <b-row
                    style="margin-top: 10px; margin-left: 0px; margin-right: 0px;"
                >
                    <p class="char-sub-title">Your certification</p>
                </b-row>
            </b-col>
        </b-row>
        
        <b-row class="inputArea no-gutters" style="margin-bottom: 30px" v-for="(allCert, index) in allCerts" :key="allCert.index">
            <b-col cols="11" lg="6" class="form-section">
               
                <b-row class="no-gutters">
                    <b-col cols="12" class="form-section">
                        <b-row
                            class="no-gutters field-box-where d-flex justify-space-between"
                            style="border: none !important"
                        >
                            <b-form-select
                                :id="allCert.index"
                                v-model="allCert.certgroup"
                                @change="setCerts"
                            >
                                <optgroup
                                    v-for="(group, name) in certGroups"
                                    :label="name"
                                    v-bind:key="name"
                                >
                                    <option
                                        v-for="option in group"
                                        :value="option"
                                        v-bind:key="option.value"
                                    >
                                        {{ option.text }}
                                    </option>
                                </optgroup>
                            </b-form-select>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row class="no-gutters" style="align-items: center; justify-content: flex-start">
                    <input style="margin-top: 4px; margin-right: 10px" type="checkbox" v-model="allCert.uploadLater" @click="changeUploadLater(index)"> 
                    <span class="char-sub-title">Upload this certificate later</span>
                </b-row>
                <b-row class="no-gutters">
                    <b-col class="form-section">
                        <span
                            role="button"
                            style="font-weight: 500; margin-top: 40px; display: block;"
                            class="select-another"
                            v-if="
                                allCerts.length == allCerts.indexOf(allCert) + 1
                            "
                            @click="addCert()"
                            @change="setCerts"
                            ><i class="fa fa-plus" style="margin-right:4px"></i
                            >Select another certification</span
                        >
                    </b-col>
                    <b-col class="form-section">
                        <span
                            v-if="allCerts.indexOf(allCert) !== 0"
                            @click="delCert"
                            @change="setCerts"
                            style="font-weight: 500"
                            ><i class="fa fa-minus" style="margin-right:4px"></i
                            >Remove field</span
                        >
                    </b-col>
                </b-row>
                <div
                    role="button"
                    v-if="submitted5 && !allCerts[0].value.length"
                    style="align-items: center; margin-top: 20%"
                >
                    <img
                        style="width: 15px; margin-bottom:1px;margin-right:4px;"
                        alt="Vue logo"
                        src="~@/assets/img/warning-icon.png"
                    />
                    <span style="color:red">Select certification</span>
                </div>
            </b-col>
            <b-col cols="11" lg="6" class="form-section">
                <b-card :header="allCert.certgroup.text" class="cert-header">
                    <b-card-text>
                        <b-row class="no-gutters">
                            <b-col cols="6" class="form-section file-field-box">
                                <span class="field-title"
                                    >Certification Number<span
                                        class="form-asterisk"
                                        >*</span
                                    ></span
                                >
                                <input
                                    class="form-field"
                                    :id="allCert.index"
                                    v-model="allCert.cert_num"
                                    placeholder=""
                                    @change="setCerts"
                                />
                            </b-col>
                            <b-col cols="7" style="position: relative">
                                <!--<img
                                    v-if="allCert.file"
                                    alt="Vue logo"
                                    style="position: absolute; width: 20px; left:10px; top: 18px; z-index: 1"
                                    src="~@/assets/img/pdf-icon.png"
                                />
                                <input
                                    id="allCerts.index"
                                    label="File input"
                                    value="current"
                                    filled
                                    dense
                                    prepend-icon="mdi-camera"
                                    v-model="allCert.file.name"
                                    disabled
                                    style="padding-left: 30px;left:5px; position:absolute;margin-top:8px; height: 40px; width: 100%"
                                />
                                <i
                                    v-if="allCert.file"
                                    @click="removeFile(index)"
                                    class="fa fa-times"
                                    aria-hidden="true"
                                    style="position: absolute; width: 20px; right:0px; top: 20px; z-index: 1"
                                ></i>-->
                            </b-col>
                            <b-col cols="7"> </b-col>
                        </b-row>
                        <b-row class="no-gutters">
                            <b-col cols="12" class="form-section">
                                <p
                                    style="margin-left: 0px; margin-top: 20px"
                                    class="char-sub-title"
                                >
                                    Upload PDF of Certification
                                    <span class="form-asterisk">*</span>
                                </p>
                                <div class="upload-row">
                                <div style="position: relative" class="button-holder">                                 
                                    <button type="button" value="UPLOAD" class="file-upload" >Upload PDF<img class="icon" src="~@/assets/img/icons/file-pdf-solid.svg" /></button>
                                    <input type="file" accept=".pdf" ref="uploadFile" @change="onUploadPDF($event, index), setCerts" name="photo" id="upload-photo" style="position: absolute; left:0"/>
                                    <!--File <input type="file" accept=".pdf" ref="uploadFile" @change="handleFileUpload()" name="uploadFile" id="uploadFile" style="position: absolute; left:0"/>-->
                                </div>
                                <div class="file-name-row">
                                <input
                                    id="allCerts.index"
                                    label="File input"
                                    value="current"
                                    filled
                                    dense
                                    prepend-icon="mdi-camera"
                                    v-model="allCert.file.name"
                                    disabled
                                    style="  "
                                    class="file-name-txt"
                                />
                                <i
                                    v-if="allCert.file"
                                    @click="removeFile(index)"
                                    class="fa fa-times"
                                    aria-hidden="true"
                                    style="position: absolute; width: 20px; right:0px; top: 20px; z-index: 1"
                                ></i>
                                </div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'Certifications',
    props: {
        submitted5: Boolean,
        code: String
    },
    data() {
        return {
            upfile: '',
            files: [],
            filenames: [],
            counter: 0,
            allCerts: [
                {
                    ID: 0,
                    file: '',
                    uploadLater: false,
                    value: [],
                    certgroup: {
                        text: '',
                    },                
                }
            ],
            certifications: "",
            certGroups: {
                'Associate for the Advancement of Cost Engineering International (AACEI)': [
                    {
                        ID: 1,
                        text: 'Certified Cost Professional (CCP)',
                        value: 'A',
                    },
                    {
                        ID: 2,
                        text: 'Certified Estimation Professional (CEP)',
                        value: 'B',
                    },
                    {
                        ID: 3,
                        text: 'Earned Value Professional (EVP)',
                        value: 'C',
                    },
                    {
                        ID: 4,
                        text: 'Planning & Scheduling Professional (PSP)',
                        value: 'D',
                    },
                    {
                        ID: 5,
                        text: 'Certified Forensic Claims Consultant (CFCC)',
                        value: 'E',
                    },
                    {
                        ID: 6,
                        text: 'Decision & Risk Management Professional (DRMP)',
                        value: 'F',
                    },
                    {
                        ID: 7,
                        text: 'Certified Cost Technician (CCT)',
                        value: 'G',
                    },
                    {
                        ID: 8,
                        text: 'Certified Scheduling Technician (CST)',
                        value: 'H',
                    },
                ],
                'American Society of Professional Estimators': [
                    {
                        ID: 9,
                        text: 'Associate Estimating Professional (AEP)',
                        value: 'I',
                    },
                    {
                        ID: 10,
                        text: 'Certified Professional Estimator (CPE)',
                        value: 'J',
                    },
                ],
                "American Society of Professional Estimators": [
                    {ID:11, text: 'Associate Estimating Professional (AEP)', value: 'I' },
                    {ID:12, text: 'Certified Professional Estimator (CPE)', value: 'J' }
                ],
                "International Cost Estimating and Analysis Association (ICEAA": [
                    {ID:16, text: 'Professional Cost Estimator/ Analyst (PCEA®)', value: 'K' },
                    {ID:17, text: 'Certified Cost Estimator/ Analyst (CCEA®)', value: 'L' },
                    {ID:18, text: 'Certified Cost Estimator/ Analyst-Parametric (CCEA®-P)', value: 'M' }
                ],
                "The Royal Institution of Chartered Surveyors (RICS": [
                    {ID:19, text: 'RICS Fellow (FRICS)', value: 'N' },
                    {ID:20, text: 'Associate Member (AssocRICS)', value: 'O' },
                    {ID:21, text: 'Chartered Member (MRICS)', value: 'P' }
                ],
                "Canada": [
                    {ID:22, text: 'Professional Quantity Surveyors (PQS)', value: 'Q' },
                    {ID:23, text: 'Construction Estimator Certified (CEC)', value: 'R' }
                ],
                "China": [
                    {ID:24, text: 'Engineering Cost Association', value: 'S' }
                ],
                "Italy": [
                    {ID:25, text: "Associazione Italiana d'Ingegneria Economica", value: 'T' }
                ],
                "Mexico": [
                    {ID:26, text: 'Sociedad Mexicana de Ingenieria, Financiera y de Costos', value: 'U' }
                ],
                "Netherlands": [
                    {ID:27, text: 'Dutch Association of Cost Engineers', value: 'V' }
                ],
                "Nigeria": [
                    {ID:28, text: 'Nigerian Institute of Appraisers and Cost Engineers', value: 'W' }
                ],"United Kingdom": [
                    {ID:29, text: 'Association of Cost Engineers', value: 'X' }
                ],
            },
        };
    },
    methods: {
        addCert() {
            this.allCerts.push({
                file: '',
                cert_num: '',
                ID: 0,
                certgroup: {
                    text: '',
                },
                uploadLater: false
            });
            this.setCerts();
        },
        delCert() {
            this.allCerts.splice(-1);
            this.setCerts();
        },
        changeUploadLater(index){
            this.allCerts[index].uploadLater = !this.allCerts[index].uploadLater;
            this.setCerts();
        },        
        setCerts() {
            var allCerts = this.allCerts;
            for(let cert in allCerts){
                allCerts[cert].ID = allCerts[cert].certgroup.ID
            }  
            this.$emit('certs', allCerts);
        },
        onUploadPDF(e, index) {
            //this.setCerts();
            this.allCerts[index].file = e.target.files[0];
            if(this.allCerts[index].cert_num == ''){
                alert("certification number is missing");
            }else{
                this.setCerts();
            }
            
        },
        removeFile(index) {
            this.setCerts();
            this.allCerts[index].file = "";
        },
        handleFileUpload(){
            this.upfile = this.$refs.uploadFile.files[0];
        },        
    },
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

.add-cert-text {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
}

.remove-cert-text {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #939393;
}

.file-field-box {
    border: 1.5px solid #c9c9c9;
    box-sizing: border-box;
    border-radius: 3px;
    width: 100%;
    height: 40px;
    margin: 8px;
}

.file-input {
    width: 100%;
}

.file-input-title {
    background: #f3f3f3;
    margin-bottom: 15px;
}

.file-upload {
    width: 137px;
    height: 40px;

    background: #0c2340;
    border-radius: 8px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 16px;
    margin-left: 15px;
    margin-bottom: 15px;

    color: #ffffff;
}

.card-body {
    padding: 0px !important;
}

.upload-card-title {
    margin-left: 15px;
}

.no-gutters {
    margin-left: 0px;
    margin-right: 0px;
}
#upload-photo {
    opacity: 0;
}

label {
    cursor: pointer;
    /* Style as you please, it will become the visible UI component. */
}
</style>
