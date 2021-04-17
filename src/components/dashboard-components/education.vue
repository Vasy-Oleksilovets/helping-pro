<template>
  <b-card class="prof-edit-education">
    <b-row class="no-guters"><b-col><p class="prof-edit-edu-title">Education</p></b-col></b-row>
    <b-row class="inputArea no-gutters mt-2" v-for="(allEdu, index) in allEdus" :key="allEdu.index">
      <b-col cols="12">
        <b-row class="no-gutters space-below-select">
          <b-col cols="12" lg="4" class="mt-2">
            <p class="prof-edit-edu-title">Bachelors</p>
            <b-form-select class="prof-edit-school mb-3" :id="allEdu.index" v-model="allEdu.edu_bach">
              <option value="" disabled selected hidden><span class="prof-edit-edu-title">xyz university</span></option>
              <option v-for="university in universities" v-bind:key="university.index" v-bind:value="university.value">
                {{ university.name }}
              </option>
            </b-form-select>
            <b-form-select class="prof-edit-school" :id="allEdu.index" v-model="allEdu.edu_bach_field">
              <option class="select-mjr" value="" disabled selected hidden >Select Major</option>
              <option v-for="major in majors" v-bind:key="major.index" v-bind:value="major.value">
                {{ major.name }}
              </option>
            </b-form-select>
          </b-col>
          <b-col cols="12" lg="4" class="mt-2">
            <p class="prof-edit-edu-title">Master's</p>
            <b-form-select class="prof-edit-school mb-3" :id="allEdu.index" v-model="allEdu.edu_mast">
              <option class="prof-edit-edu-title" value="" disabled selected hidden>xyz university</option>
              <option  v-for="university in universities" v-bind:key="university.index" v-bind:value="university.value">{{ university.name }}</option>
            </b-form-select>
            <b-form-select class="prof-edit-school" :id="allEdu.index" v-model="allEdu.edu_mast_field">
              <option class="select-mjr" value="" disabled selected hidden>Select Major</option>
              <option v-for="major in majors" v-bind:key="major.index" v-bind:value="major.value">{{ major.name }}</option>
            </b-form-select>
          </b-col>
          <b-col cols="12" lg="4" class="mt-2">
            <p class="prof-edit-edu-title">PHD</p>
            <b-form-select class="prof-edit-school mb-3" :id="allEdu.index" v-model="allEdu.edu_phd">
                <option class="prof-edit-edu-title" value="" disabled selected hidden>xyz university</option>
                <option v-for="university in universities" v-bind:key="university.index" v-bind:value="university.value">{{ university.name }}</option>
            </b-form-select>
            <b-form-select class="prof-edit-school" :id="allEdu.index" v-model="allEdu.edu_phd_field">
              <option class="select-mjr" value="" disabled selected hidden >Select Major</option>
              <option v-for="major in majors" v-bind:key="major.index" v-bind:value="major.value">{{ major.name }}</option>
            </b-form-select>
            <img v-if="index > 0" @click="removeEducation(index)" alt="Remove But" class="minus-image-style mt-2" src="~@/assets/img/small-icons/minus-circle-icon.png"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="no-gutters space-below mt-3">
      <b-col class="form-section">
        <span class="font-weight-bold" @click="addEdu()" @change="setEdus"><i class="fa fa-plus" style="margin-right:4px"></i>Add</span>
      </b-col>
    </b-row>
    <b-row class="inputArea no-gutters mt-2" v-for="(allCert, index) in allCerts" :key="allCert.index">
      <b-col cols="12" lg="5" class="mt-2">
        <b-row class="no-gutters">
          <p class="prof-edit-edu-title">Certifications & Credentials</p>
          <b-form-select class="prof-edit-cert" :id="allCert.index" v-model="allCert.value" @change="setCerts">
            <optgroup v-for="(group, name) in certGroups" :label="name" v-bind:key="name">
              <option v-for="option in group" :value="option.text" v-bind:key="option.value">{{ option.text }}</option>
            </optgroup>
          </b-form-select>
        </b-row>
      </b-col>
      <b-col cols="12" lg="3" class="mt-2">
        <p class="prof-edit-edu-title">Certification Number</p>
        <input class="prof-edit-certnum" :id="allCert.index" v-model="allCert.cert_num" placeholder="xxxx-xxxx-xx-xxxxx" @change="setCerts"/>
      </b-col>
      <!-- If file exists, display file info -->
      <b-col v-if="allCert.file" lg="4" cols="12" class="mt-2">
        <p class="prof-edit-edu-title">Upload PDF Certification</p>
        <div class="position-relative d-flex align-items-center">
          <img v-if="allCert.file" alt="Vue logo" class="pdf-icon-style" src="~@/assets/img/pdf-icon.png"/>
          <input class="input-style pdf-input-style" id="allCerts.index" placeholder="Select a file" value="current" filled dense prepend-icon="mdi-camera" v-model="allCert.file.name" disabled/>
          <i v-if="allCert.file" @click="removeFile(index)" class="fa fa-times photo-icon-style" aria-hidden="true"></i>
          <img alt="Remove But" class="minus-image-style" @click="removeCertificationRow(index)" src="~@/assets/img/small-icons/minus-circle-icon.png"/>
        </div>
      </b-col>
      <!-- else file not exist display upload button -->
      <b-col v-else cols="12" lg="4" class="mt-2">
        <p class="prof-edit-edu-title">Upload PDF Certification</p>
        <div class="position-relative d-flex align-items-center justify-content-between">
          <div class="font-weight-bold"> Upload PDF of Certification </div>
          <b-button type="submit" class="button-color-style">Upload</b-button>
          <input type="file" ref="fileuploadinput" accept=".pdf" @change="onUploadPDF($event, index), setCerts" name="photo" id="upload-photo" class="photo-upload-input"/>
          <img v-if="index == 0" alt="Remove But" style="opacity: 0" src="~@/assets/img/small-icons/minus-circle-icon.png"/>
          <img v-else alt="Remove But" @click="removeCertificationRow(index)" src="~@/assets/img/small-icons/minus-circle-icon.png"/>
        </div>
      </b-col>
    </b-row>
    <b-row class="no-gutters">
      <b-col class="form-section">
        <span style="font-weight: 900" @click="addCert()" @change="setCerts"><i class="fa fa-plus mt-3 mr-1"></i>Select another certification</span>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'ProfileEducation',
  data() {
    return {
      universities: [
        { name: 'Savannah College of Art and Design', value: 'SCAD' },
        { name: 'Univeristy of Earth', value: 'UoE' },
        { name: 'University of Mars', value: 'UoM' },
        { name: 'Blah Blah College Place', value: 'BBCP' },
        { name: 'School of Hard Knocks', value: 'SoHK' },
        { name: 'Self Taught University', value: 'STU' },
        { name: 'Fake It Till You Make it', value: 'FITYMI' },
      ],
      majors: [
        { name: 'Science', value: 'sci' },
        { name: 'Faith', value: 'faith' },
        { name: 'Arts', value: 'art' },
        { name: 'Engineering', value: 'eng' },
        { name: 'Water Polo', value: 'polo' },
        { name: 'Flat Earthism', value: 'fe' },
      ],
      allCerts: [
          { id: 'cert0', cert_num: '', file: '', value: [] },
      ],
      allEdus: [
        {
          id: 'edu0',
          edu_bach: '',
          edu_mast: '',
          edu_phd: '',
          edu_bach_field: '',
          edu_mast_field: '',
          edu_phd_field: '',
        },
      ],
      certifications: [],
      educations: [],
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
          'International Cost Estimating and Analysis Association (ICEAA': [
            {
              ID: 11,
              text: 'Professional Cost Estimator/ Analyst (PCEA®)',
              value: 'K',
            },
            {
              ID: 12,
              text: 'Certified Cost Estimator/ Analyst (CCEA®)',
              value: 'L',
            },
            {
              ID: 13,
              text:
                  'Certified Cost Estimator/ Analyst-Parametric (CCEA®-P)',
              value: 'M',
            },
          ],
          'The Royal Institution of Chartered Surveyors (RICS': [
            { ID: 12, text: 'RICS Fellow (FRICS)', value: 'N' },
            {
                ID: 13,
                text: 'Associate Member (AssocRICS)',
                value: 'O',
            },
            { ID: 14, text: 'Chartered Member (MRICS)', value: 'P' },
          ],
          Canada: [
              {
                  ID: 15,
                  text: 'Professional Quantity Surveyors (PQS)',
                  value: 'Q',
              },
              {
                  ID: 16,
                  text: 'Construction Estimator Certified (CEC)',
                  value: 'R',
              },
          ],
          China: [
              {
                  ID: 17,
                  text: 'Engineering Cost Association',
                  value: 'S',
              },
          ],
          Italy: [
              {
                  ID: 18,
                  text: "Associazione Italiana d'Ingegneria Economica",
                  value: 'T',
              },
          ],
          Mexico: [
              {
                  ID: 19,
                  text:
                      'Sociedad Mexicana de Ingenieria, Financiera y de Costos',
                  value: 'U',
              },
          ],
          Netherlands: [
              {
                  ID: 20,
                  text: 'Dutch Association of Cost Engineers',
                  value: 'V',
              },
          ],
          Nigeria: [
              {
                  ID: 21,
                  text:
                      'Nigerian Institute of Appraisers and Cost Engineers',
                  value: 'W',
              },
          ],
          'United Kingdom': [
              {
                  ID: 22,
                  text: 'Association of Cost Engineers',
                  value: 'X',
              },
          ],
      },
    };
  },
  methods: {
    addCert() {
      this.allCerts.push({
        id: `cert${++this.counter}`,
        file: '',
        cert_num: '',
        value: '',
      });
      this.setCerts();
    },
    closeProfileModal() {
      this.$emit('closeProfileModal');
    },
    addEdu() {
      this.allEdus.push({
        id: `edu${++this.counter}`,
        file: '',
        cert_num: '',
        value: '',
      });
      this.setEdus();
    },
    delCert() {
      this.allCerts.splice(-1);
      this.setCerts();
    },
    setCerts() {
      var allCerts = this.allCerts;
      this.$emit('certs', allCerts);
    },
    setEdus() {
      var allEdus = this.allEdus;
      this.$emit('edus', allEdus);
    },
    onUploadPDF(e, index) {
      this.setCerts();
      this.allCerts[index].file = e.target.files[0];
    },
    removeFile(index) {
      this.setCerts();
      this.allCerts[index].file = '';
    },
    //If someone click the remove Education button this function will be invoked.
    removeEducation(index) {
      this.allEdus.splice(index, 1);
    },

    //If someone click the remove Certification button this function will be invoked
    removeCertificationRow(index) {
      this.allCerts.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.card {
  border: none !important;
}

.card-body {
  padding: 0rem !important;
}

.prof-edit-education {
  width: 100%;
}
.prof-edit-edu-title {
  font-weight: 900;
}

.prof-edit-school {
  width: 93%;
}

.prof-edit-cert {
  width: 95%;
}

.input-style {
  padding: 1px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  padding: 8px 10px;
}

.prof-edit-certnum {
  width: 90%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  /*outline-color: #f4f4f4;*/
  border: 1px solid #cfcfcf;
  border-radius: 2px;
}

.space-below {
  margin-bottom: 25px;
}

.space-below-select {
  margin-bottom: 12px;
}

.submit-button {
  width: 100%;
  text-decoration: none;
  outline: none;
  background-color: #0c2340;
}

.button-color-style {
  background-color: #0c2340;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}

.select-mjr {
  color: #f4f4f4;
}

.minus-image-style {
  position: absolute;
  width: 20px;
  right: 0px;
  z-index: 1;
}

.pdf-icon-style {
  position: absolute;
  width: 20px;
  left: 10px;
  top: 8px;
  z-index: 1;
}

.pdf-input-style {
  padding-left: 30px;
  left: 5px;
  width: 90%;
}

.photo-upload-input {
  position: absolute;
  right: 17%;
  width: 20%;
  height: 24px;
  opacity: 0;
}

.photo-icon-style {
  position: absolute;
  width: 20px;
  right: 10%;
  top: 10px;
  z-index: 1;
}
.custom-select {
  background: #fff
    url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2  -1h4zm0 5L0 1h4z'/%3E%3C/svg%3E")
    no-repeat right 0.75rem center/8px 10px;
}
</style>
