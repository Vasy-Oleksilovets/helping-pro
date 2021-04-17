<template>
    <section class="module-pricing new-module-pricing custom-module blue pricing mb-5" name="pricing" id="new_pricing">
        <div class="content-holder desktop-pricing">
            <div class="pricing-heading">
                <div class="heading"><span>PRICING</span></div>
                <div class="column-headings" style="background-color:#df7b00">
                    <div class="column-header column-header-1">
                        <h3>PROJECT</h3>
                        <h5>(Individual)</h5>
                        <h4>$99</h4>
                    </div>
                    <div class="column-header column-header-2">
                        <h3>PORTFOLIO</h3>
                        <h5>(Teams)</h5>
                        <h4>$149</h4>
                    </div>
                    <div class="column-header column-header-2">
                        <h3>ENTERPRISE</h3>
                        <h5>(Organization)</h5>
                        <h4>$300</h4>
                    </div>
                </div>
            </div>
            <div class="pricing-headers">
                <div class="field-header" style="color:#df7b00">CORE FEATURES</div>
                <div class="values-header" style="background-color: #df7b00">Subscription anually per person + basis of estimate report & detailed cost estimate priced separately per project.</div>
            </div>
            <div class="pricing-rows">
                <div class="pricing-row pricing-row-1">
                    <p class="field-name"><span>Create Projects</span></p>
                    <p class="field-value field-project"><i class="fa fa-check"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-check"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-2">
                    <p class="field-name"><span>Designated Project Manager</span></p>
                    <p class="field-value field-project"><i class="fa fa-check"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-check"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-3">
                    <p class="field-name"><span>Automatic Cloud Backup</span></p>
                    <p class="field-value field-project"><i class="fa fa-check"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-check"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-4">
                    <p class="field-name"><span>Remote File Access</span></p>
                    <p class="field-value field-project"><i class="fa fa-check"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-check"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-5">
                    <p class="field-name"><span>Archive to Amazon S3</span></p>
                    <p class="field-value field-project"><i class="fa fa-check"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-check"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-6">
                    <p class="field-name"><span>Add User Role-based Account Access</span></p>
                    <p class="field-value field-project"><i class="fa fa-times"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-check"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-7">
                    <p class="field-name"><span>Centralized Management & Admin Controls</span></p>
                    <p class="field-value field-project"><i class="fa fa-times"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-check"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-8">
                    <p class="field-name"><span>Monitoring & Dashboards</span></p>
                    <p class="field-value field-project"><i class="fa fa-times"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-check"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-9">
                    <p class="field-name"><span>Multiple Office Locations</span></p>
                    <p class="field-value field-project"><i class="fa fa-times"></i></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-times"></i></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
                <div class="pricing-row pricing-row-10">
                    <p class="field-name"><span>Add Multiple Administrators</span></p>
                    <p class="field-value field-project"><i class="fa fa-times"></i></p>
                    <p class="field-value field-portfolio"><i class="fa fa-times"></i></p>
                    <p class="field-value field-enterprise"><i class="fa fa-check"></i></p>
                </div>
            </div>
            <div class="pricing-buttons">
                <div class="pricing-button pricing-button-1">
                    <a :class="clientRole==='project'?'active-signup-button':'signup-button'" @click="changeClientRole('project')">Sign up</a><span></span>
                </div>
                <div class="pricing-button pricing-button-2">
                    <a :class="clientRole==='portfolio'?'active-signup-button':'signup-button'" @click="changeClientRole('portfolio')">Sign up</a><span></span>
                </div>
                <div class="pricing-button pricing-button-3">
                    <a :class="clientRole==='enterprise'?'active-signup-button':'signup-button'" class="signup-button"  @click="changeClientRole('enterprise')">Sign up</a><span></span>
                </div>
            </div>
        </div>

        <div class="content-holder content-holder-mobile mobile-pricing">
            <div class="heading">
                <span>PRICING</span>
                <p>Subscription annually per person + basis of estimate report & detailed cost estimate priced separately per project</p>
            </div>

            <div class="pricing-block pricing-project">
                <div class="pricing-heading project-heading">
                    <div style="background-color: #df7b00">
                        <h3>PROJECT</h3>
                        <h5>(Individual)</h5>
                        <h4>$99</h4>
                    </div>
                </div>
                <div class="pricing-rows project-pricing">
                    <div class="pricing-field project-field">
                        <p>Create Projects</p>
                        <p>Designated Project Manager</p>
                        <p>Automatic Cloud Backup</p>
                        <p>Remote File Access</p>
                        <p>Archive to Amazon S3</p>
                        <p>Add User Role-based Account Access</p>
                        <p>Centralized Management & Admin Controls</p>
                        <p>Monitoring & Dashboards</p>
                        <p>Multiple Office Locations</p>
                        <p>Add Multiple Administrators</p>
                    </div>
                    <div class="pricing-value project-value">
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-times"></i></p>
                        <p><i class="fa fa-times"></i></p>
                        <p><i class="fa fa-times"></i></p>
                        <p><i class="fa fa-times"></i></p>
                        <p><i class="fa fa-times"></i></p>
                    </div>
                </div>
                <div class="pricing-button project-button">
                    <div><a @click="changeClientRole('project')">SIGN UP</a></div>
                </div>
            </div>

            <div class="pricing-block pricing-portfolio">
                <div class="pricing-heading project-heading">
                    <div style="background-color: #df7b00">
                        <h3>PORTFOLIO</h3>
                        <h5>(Teams)</h5>
                        <h4>$149</h4>
                    </div>
                </div>
                <div class="pricing-rows portfolio-pricing">
                    <div class="pricing-field project-field">
                        <p>Create Projects</p>
                        <p>Designated Project Manager</p>
                        <p>Automatic Cloud Backup</p>
                        <p>Remote File Access</p>
                        <p>Archive to Amazon S3</p>
                        <p>Add User Role-based Account Access</p>
                        <p>Centralized Management & Admin Controls</p>
                        <p>Monitoring & Dashboards</p>
                        <p>Multiple Office Locations</p>
                        <p>Add Multiple Administrators</p>
                    </div>
                    <div class="pricing-value project-value">
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-times"></i></p>
                        <p><i class="fa fa-times"></i></p>
                    </div>
                </div>
                <div class="pricing-button portfolio-button">
                    <div><a @click="changeClientRole('portfolio')">SIGN UP</a></div>
                </div>
            </div>

            <div class="pricing-block pricing-enterprise">
                <div class="pricing-heading project-heading">
                    <div style="background-color: #df7b00">
                        <h3>ENTERPRISE</h3>
                        <h5>(Organization)</h5>
                        <h4>$300</h4>
                    </div>
                </div>
                <div class="pricing-rows portfolio-pricing">
                    <div class="pricing-field project-field">
                        <p>Create Projects</p>
                        <p>Designated Project Manager</p>
                        <p>Automatic Cloud Backup</p>
                        <p>Remote File Access</p>
                        <p>Archive to Amazon S3</p>
                        <p>Add User Role-based Account Access</p>
                        <p>Centralized Management & Admin Controls</p>
                        <p>Monitoring & Dashboards</p>
                        <p>Multiple Office Locations</p>
                        <p>Add Multiple Administrators</p>
                    </div>
                    <div class="pricing-value project-value">
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                        <p><i class="fa fa-check"></i></p>
                    </div>
                </div>
                <div class="pricing-button enterprise-button">
                    <div><a @click="changeClientRole('enterprise')">SIGN UP</a></div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
export default {
    name: 'PricingTable',
    props: ['pclientRole'],
    data(){
        return {
            clientRole: ''
        }
    },
    methods: {    
        signup(role){
            this.$emit('showEmailInput', role);
        },
        changeClientRole(role){
            this.clientRole = role;
            this.signup(role);
        }
    },
    components: {
    },
    created() {
        this.clientRole = this.pclientRole;
        this.signup('');
    }
}
</script>

<style scoped>
/*--------------------------------------------------------------
## New Pricing Section
--------------------------------------------------------------*/
.new-module-pricing i.fa {
	border-radius: 50%;
    color: #fff;
	font-weight: 600;
}
.new-module-pricing i.fa.fa-check {
	font-size: 14px;
	padding: 6px;
	background-color: #0b2240;
}
.new-module-pricing i.fa.fa-times {
	font-size: 16px;
	padding: 6px 8px;
	background-color: #df7b00;
}
.new-module-pricing h3,
.new-module-pricing h4,
.new-module-pricing h5 {
	line-height: 1.25;
}
.new-module-pricing h3 {
	font-size: 18px;
	text-transform: uppercase;
}
.new-module-pricing h4 {
	font-size: 16px;
}
.new-module-pricing h5 {
	font-size: 14px;
	font-weight: 600;
}
.signup-button {
	text-transform: uppercase !important;
	border: 1px solid #DF7B00 !important;
	background-color: #fff !important;
	padding: 3px 16px !important;
	font-size: 14px !important;
	font-weight: 700 !important;
}
.active-signup-button {
    text-transform: uppercase !important;
	border: 1px solid white !important;
	background-color: #DF7B00 !important;
	padding: 3px 16px !important;
	font-size: 14px !important;
	font-weight: 700 !important;
    color: white !important;
}
.desktop-pricing .pricing-heading {
	display: flex;
}
.desktop-pricing .heading {
	width: 25%;
}
.desktop-pricing .column-headings {
	width: 75%;
	display: flex;
}
.desktop-pricing .column-header {
	width: 33.33%;
	padding: 6px;
	text-align: center;
	border: 1px solid #e7e7e8;
}
.desktop-pricing .column-header:not(:last-child) {
	border-right: none;
}
.desktop-pricing .pricing-headers {
  display: flex;
}
.desktop-pricing .field-header {
	width: 25%;
	min-height: 48px;
	padding: 0 6px;
	font-size: 16px;
	font-weight: 700;
	text-transform: uppercase;
	background-color: #e7e7e8;
	border: 1px solid #fff;
	display: flex;
	align-items: center;
}
.desktop-pricing .values-header {
	width: 75%;
	min-height: 48px;
	line-height: 1;
	padding: 0 6px;
	font-size: 14px;
	border-right: 1px solid #fff;
	border-left: 1px solid #fff;
	display: flex;
	justify-content: center;
	align-items: center;
  text-align: center;
}
.desktop-pricing .pricing-rows {
	color: #0b2240;
	background-color: #e7e7e8;
}
.desktop-pricing .pricing-row {
	display: flex;
}
.desktop-pricing .pricing-row p {
	width: 25%;
	min-height: 48px;
	margin: 0;
	padding: 0 6px;
	border: 1px solid #fff;
	line-height: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}
.desktop-pricing .pricing-row p:first-child {
	justify-content: flex-start;
	font-size: 14px;
	font-weight: 700;
}
.desktop-pricing .field-value {
	text-align: center;
}
.desktop-pricing .pricing-buttons {
  display: flex;
  justify-content: flex-end;
}
.desktop-pricing .pricing-button {
  width: 25%;
	min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mobile-pricing {
	display: none;
}
.mobile-pricing .heading p {
  font-size: 14px;
  font-weight: 600;
}
.mobile-pricing .pricing-block {
	margin-top: 24px;
}
.content-holder.content-holder-mobile {
	max-width: 750px;
}
.mobile-pricing .pricing-heading {
	display: flex;
	justify-content: flex-end;
}
.mobile-pricing .pricing-heading div {
	width: 50%;
	text-align: center;
  padding: 6px;
	border-top: 1px solid #e7e7e8;
	border-right: 1px solid #e7e7e8;
  border-left: 1px solid #e7e7e8;
}
.mobile-pricing .pricing-rows {
	color: #0b2240;
	background-color: #e7e7e8;
	display: flex;
}
.mobile-pricing .pricing-rows div {
	width: 50%;
}
.mobile-pricing .pricing-rows p {
	font-size: 14px;
	font-weight: 700;
	height: 42px;
	margin: 0;
	padding: 0 6px;
	line-height: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #fff;
}
.mobile-pricing .pricing-field p {
	justify-content: flex-start;
}
.mobile-pricing .pricing-button {
	display: flex;
	justify-content: flex-end;
}
.mobile-pricing .pricing-button div {
	width: 50%;
	min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*--------------------------------------------------------------
## Media Query
--------------------------------------------------------------*/
@media only screen and (max-width: 768px) {
	.desktop-pricing {
		display: none;
	}
	.mobile-pricing {
		display: block;
	}
}
@media only screen and (max-width: 414px) {
	.mobile-pricing .pricing-heading div {
    width: 100%;
	}
	.mobile-pricing .pricing-rows div.pricing-field {
		width: 66%;
	}
	.mobile-pricing .pricing-rows div.pricing-value {
		width: 34%;
	}
	.mobile-pricing .pricing-button div {
    width: 34%;
	}
	.new-module-pricing a {
    padding: 3px 10px;
	}
}

.custom-module .heading span {
    border-bottom: 2px solid #DF7B00;
    display: inline-block;
    padding: 0 0 8px;
}

.new-module-pricing i.fas.fa-check {
    font-size: 14px;
    padding: 6px;
    background-color: #0b2240;
}

a, a:link, a:visited {
    color: #DF7B00 !important;
    cursor: pointer !important;
    text-decoration: none !important;
}
</style>
