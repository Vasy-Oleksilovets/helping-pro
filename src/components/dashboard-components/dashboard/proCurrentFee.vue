<template>
    <div class="w-100 h-100 current-fee-body">
        <div class="border-bottom border-dark">Fee Submission</div>
        <div class="margin-4-percent mb-5">
            <div class="margin-2-percent">
                <img
                    class="mr-2"
                    width="14px"
                    alt="Vue logo"
                    src="~@/assets/img/small-icons/check-icon.png"
                />
                <span>Create free submission</span>
            </div>
            <div class="margin-2-percent">
                <img
                    class="mr-2"
                    width="14px"
                    alt="Vue logo"
                    src="~@/assets/img/small-icons/check-icon.png"
                />
                <span>Submit fee submission</span>
            </div>
            <div class="margin-2-percent">
                <img
                    class="mr-2"
                    width="14px"
                    alt="Vue logo"
                    src="~@/assets/img/small-icons/check-icon.png"
                />
                <span>Fee submission approved</span>
            </div>
        </div>
        <b-row class="d-flex justify-content-end mr-auto">
            <button type="button" class="btn btn-custom-style">
                Create Fee Submission
            </button>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'ProCurrentFee',
};
</script>

<style scoped>
.current-fee-body {
    background: #f4f5f8;
    padding: 10px 20px 10px 20px;
}

.margin-bottom-13-percent {
    margin-bottom: 10%;
}

.margin-4-percent {
    margin-top: 4%;
}

.margin-2-percent {
    margin-top: 3%;
}

.btn-custom-style {
    background: #0c2340 !important;
    color: white;
    font-size: 1em;
    padding: 3px 6px 3px 6px;
    font-weight: 500;
    border-radius: 3px;
}
</style>
