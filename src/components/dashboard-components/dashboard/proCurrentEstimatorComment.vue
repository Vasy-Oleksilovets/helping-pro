<template>
    <div class="w-100 current-comment-body">
        <div class="border-bottom border-dark">Estimator: New Comments (2)</div>
        <div class="overflow-auto custom-height">
            <div class="bg-white pt-2 pl-1 pr-1 pb-2 mt-2">
                <div class="d-flex justify-content-between">
                    <b-col sm="2">
                        <img
                            alt="New Comments Avatar"
                            src="~@/assets/img/avatars/estimator-new-comments-avatar.png"
                    /></b-col>
                    <b-col sm="10">
                        <div
                            class="d-flex justify-content-between font-color-grey"
                        >
                            <div>New Unread</div>
                            <div>January 1, 2020, 9:30 AM</div>
                        </div>
                        <div class="general-font text-primary">Estimate: line item</div>
                        <div>Joe Estimator/Position/Title</div>
                        <div class="general-font">Architectural</div>
                    </b-col>
                </div>
            </div>
            <div class="bg-white pt-2 pl-1 pr-1 pb-2 mt-2">
                <div class="d-flex justify-content-between">
                    <b-col sm="2"
                        ><img
                            alt="New Comments Avatar"
                            src="~@/assets/img/avatars/estimator-new-comments-avatar.png"
                    /></b-col>
                    <b-col sm="10">
                        <div
                            class="d-flex justify-content-between font-color-grey"
                        >
                            <div class="pb-1">New Unread</div>
                            <div>January 1, 2020, 9:30 AM</div>
                        </div>
                        <div class="general-font text-primary">Estimate: line item</div>
                        <div>Joe Estimator/Position/Title</div>
                        <div class="general-font">Structural</div>
                    </b-col>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'proCurrentEstimatorComment',
};
</script>

<style scoped>
.current-comment-body {
    background: #f4f5f8;
    padding: 10px 20px 10px 20px;
}

.btn-custom-style {
    background: #0c2340 !important;
    color: white;
    font-size: 1em;
    padding: 3px 6px 3px 6px;
    font-weight: 500;
    border-radius: 3px;
}

.message-color {
    color: #e07c00;
}

.date-color {
    color: #458fff;
}

.general-font {
    font-weight: normal;
}

.font-color-grey {
    color: #c9c9c9;
}

.custom-height {
    height: 180px;
}

::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #d7d7d7;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
