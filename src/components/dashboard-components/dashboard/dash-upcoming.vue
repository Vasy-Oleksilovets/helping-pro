<template>
    <div class="dash-welcome">
        <div class="row title-text">
            No Upcoming Projects
        </div>
        <div class="row underline"></div>
        <div class="row">
            <b-col cols="12" lg="" class="card-section">
                <div class="custom-card">
                    <div class="card-content">
                        <div class="title-text">Team Members (0)</div>
                        <div class="inline-style">
                            <div class="retangle">
                                <img
                                    class="ml5"
                                    alt="Vue logo"
                                    src="~@/assets/img/small-icons/default-avatar.png"
                                />
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </b-col>
            <b-col cols="12" lg="" class="card-section">
                <div class="custom-card height90">
                    <div class="card-content">
                        <div class="title-text mb-10">Messages (1)</div>
                        <div class="light-blue-back">
                            <div class="grey-container">
                                <div class="ml5pro">
                                    <div
                                        style="margin-top: 8px; margin-bottom: 5px;"
                                        class="title-text"
                                    >
                                        New Message 1
                                    </div>
                                    <div class="mb-10">
                                        Welcome to Construction Check !
                                    </div>
                                </div>
                                <div class="date-style">9/6/2019</div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </b-col>
            <b-col cols="12" lg="" class="card-section">
                <div class="custom-card" style="height90">
                    <div class="card-content">
                        <div class="title-text">Updates (0)</div>
                    </div>
                    <div></div>
                </div>
            </b-col>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashUpcoming',
};
</script>
<style scoped>
.dash-welcome {
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 30px 40px 20px 40px;
    margin: 30px;
}
.title-text {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
}
.underline {
    border-bottom: 1px solid black;
}
.custom-card {
    margin-top: 15px;
    padding: 11px 11px 12px 32px;
    background-color: #f4f5f8;
    height: 90%;
}
.btn-color {
    background-color: #0c2340;
    font-size: 12px;
    border-radius: 3px;
}

.card-section {
    width: 30%;
}
.margintop-10 {
    margin-top: 15px;
}
.profile-underline {
    margin-top: 8px;
    margin-right: 13px;
    border-bottom: 1px solid black;
}
.retangle {
    margin-top: 10px;
    padding-top: 8.3px;
    padding-bottom: 8.3px;
    padding-left: 17.99px;
    padding-right: 17.99px;
    background-color: #e9f2ff;
    margin-bottom: 15px;
}

.inline-style {
    display: flex;
}

.ml5 {
    margin-left: 5px;
}

.height90 {
    height: 90%;
}

.mb-10 {
    margin-bottom: 10px;
}

.grey-container {
    display: flex;
    justify-content: space-between;
    width: 98%;
    background-color: #e9f2ff;
}

.ml5pro {
    margin-left: 5%;
}

.date-style {
    color: #458fff;
    margin-right: 10px;
    margin-top: 8px;
}

@media only screen and (max-width: 600px) {
    .card-section {
        width: 100%;
    }
    .dash-welcome {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        padding: 10px 10px 20px 40px;
        margin: 0px;
        margin-top: 10px;
    }
}
</style>
