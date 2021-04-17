<template>
  <div class="content-card">
    <b-row>
      <b-col class="title">
        Summary
      </b-col>
    </b-row>
    <b-row class="summary-body mt-5">
      <b-col sm="5">
        <div class="section mb-5">
          <div class="section-title mb-2">
            Opinion of Probable Cost Summary
          </div>
          <div class="section-body">
            <div class="section-text">
              This OPC is based on standards and best practices defined by the Association for the Advancement of Cost Engineering International (“AACEI”).
            </div>
          </div>
        </div>
        <div class="section mb-5">
          <div class="section-title mb-2">
            Prepared for
          </div>
          <div class="section-body">
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Client
              </div>
              <div class="section-text">
                Atlanta Hartsfield Jackson International Airport
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Type
              </div>
              <div class="section-text">
                3.5 Specialized Airport Facility
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Total Square Footage
              </div>
              <div class="section-text">
                25,000
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Task/Purchase/Job#
              </div>
              <div class="section-text">
                123456
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Report Date
              </div>
              <div class="section-text">
                March 18, 2021
              </div>
            </div>
          </div>
        </div>
        <div class="section mb-5">
          <div class="section-title mb-2">
            Purpose of Estimate
          </div>
          <div class="section-body">
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Type of Estimate
              </div>
              <div class="section-text">
                Concept Screening
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Current Level of Detail
              </div>
              <div class="section-text">
                0% to 2%
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Expected Accuracy Range
              </div>
              <div class="section-text mb-1">
                L: $8,000.00 /-(-20%)
              </div>
              <div class="section-text">
                H: $20,000.00 /+(100%)
              </div>
            </div>
          </div>
        </div>
        <div class="section mb-5">
          <div class="section-title mb-2">
            Maturity Level of Project Documents
          </div>
          <div class="section-body">
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Documents Scope Date
              </div>
              <div class="section-text">
                February 28, 2021
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Submission Date
              </div>
              <div class="section-text">
                March 16, 2021
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                End Date
              </div>
              <div class="section-text">
                March 31, 2021
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col offset-sm="2" sm="5">
        <div class="section mb-5">
          <div class="section-title mb-2">
            Construction Check
          </div>
          <div class="section-body">
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Project Budget
              </div>
              <div class="section-text">
                $10,000.00
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Budget Check
              </div>
              <div class="section-text">
                $25,000.00
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Delta (-/+)
              </div>
              <div class="section-text" style="color: red">
                ($15,000.00)
              </div>
            </div>
          </div>
        </div>
        <div class="section mb-5">
          <div class="section-title mb-2">
            Price Per Squarefoot
          </div>
          <div class="section-body">
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Budget Price Per SQFT
              </div>
              <div class="section-text">
                $0.40
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Check Price Per SQFT
              </div>
              <div class="section-text">
                $1.00
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Budget Price Per SQFT
              </div>
              <div class="section-text" style="color: red">
                ($0.60)
              </div>
            </div>
          </div>
        </div>
        <div class="section mb-5">
          <div class="section-title mb-2">
            Estimating Team
          </div>
          <div class="section-body">
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Production Manager
              </div>
              <div class="section-text">
                M Watson
              </div>
            </div>
            <div class="mb-3 d-flex flex-column">
              <div class="section-label mb-1">
                Project Manager
              </div>
              <div class="section-text">
                Lukas Bradley
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>

export default {
  name: 'Summary',
  props: [],
  components: {
  },
  data() {
      return {
      };
  },
  methods: {
  },
  created() {
  },
  watch: {
  },
  filters: {
  }
};
</script>

<style scoped>
.content-card {
  margin: 30px;
  background-color: white;
  min-height: 80vh;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 32px;
}
.title {
  font-family: Montserrat;
  font-size: 19px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: left;
  color: #252733;
}
.section-title {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  text-align: left;
  color: #000000;
}
.section-text {
  font-family: Mulish;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  text-align: left;
  color: #252733;
}
.section-label {
  font-family: Mulish;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.1px;
  text-align: left;
  color: #7c7e89;
}
.section, .section-body {
  display: flex;
  flex-direction: column;
}
</style>
