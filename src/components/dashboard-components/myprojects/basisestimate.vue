<template>
    <b-row class="basis-estimate no-gutters">
        <b-col
            lg="10"
            class="background-card"
            style="width: 100vh; padding: 0px;"
        >
            <FirstPage v-if="step == 100" />
            <Introduction
                :introductionData="introduction_data"
                v-if="step == 0"
            />
            <Basis v-if="step == 1" :basisData="basis_data" />
            <Cost v-if="step == 2" :costData="cost_data" />
            <Allowances v-if="step == 3" :allowancesData="allowances_data" />
            <Qualification
                v-if="step == 4"
                :qualificationData="qualification_data"
            />
            <Risk v-if="step == 5" :riskData="opportunities_data" />
        </b-col>
        <b-col class="nav-bar" lg="2" style="padding: 0px;">
            <!-- <EstimateNav @addMenu="addMenu" @showMenu="showMenu"/> -->

            <div class="dash-nav">
                <b-row class="no-gutters">
                    <div class="nav-upper">
                        <div
                            style="display: flex; justify-content: space-between"
                        >
                            <div
                                style="color: white; margin-right: 20px; margin-top: 5px"
                                class="hamberger-menu"
                            >
                                <i
                                    class="fa fa-bars fa-2x"
                                    aria-hidden="true"
                                    @click="toggleMenu"
                                ></i>
                            </div>
                        </div>
                        <ul
                            class="dash-nav-list"
                            v-bind:style="{
                                display: showMenu ? 'none' : 'block',
                            }"
                        >
                            <li class="esti-nav-header">
                                <span>Baisc of Estimate</span>
                            </li>
                            <li
                                class="dash-nav-item"
                                v-bind:class="{ active: isActive[0] }"
                                @click="clickMenu(0)"
                                role="button"
                            >
                                <span>Introduction</span>
                                <img
                                    class="dash-nav-arrow"
                                    alt="Vue logo"
                                    src="~@/assets/img/down-arrow.png"
                                />
                            </li>

                            <!-- Sub list for the Introduction -->

                            <ul v-if="intro_sub" class="dash-nav-list">
                                <li class="dash-nav-intro" role="button">
                                    <span class="mr-4">1.1</span
                                    ><span>Purpose</span>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">1.2</div>
                                    <div>Project Scope<br />Description</div>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">1.3</div>
                                    <div>Project Task<br />Description</div>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">1.4</div>
                                    <div>Background</div>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">1.5</div>
                                    <div>Methodology</div>
                                </li>
                                <li
                                    class="dash-nav-intro"
                                    @click="newMenu('introduction')"
                                    role="button"
                                >
                                    <div class="mr-4">
                                        <img
                                            alt="Add Button"
                                            src="~@/assets/img/add_but.png"
                                        />
                                    </div>
                                    <div>Add new field</div>
                                </li>
                            </ul>

                            <!-- End Sub list for the Introduction -->

                            <li
                                class="dash-nav-item"
                                v-bind:class="{ active: isActive[1] }"
                                @click="clickMenu(1)"
                                role="button"
                            >
                                <span>Basis and <br />Assumptions</span>
                                <img
                                    class="dash-nav-arrow"
                                    alt="Vue logo"
                                    src="~@/assets/img/down-arrow.png"
                                />
                            </li>

                            <!-- Sub list for the Basis of Estimate -->

                            <ul v-if="basis_sub" class="dash-nav-list">
                                <li class="dash-nav-intro" role="button">
                                    <span class="mr-4">2.1</span
                                    ><span>Design Basis</span>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">2.2</div>
                                    <div>Planning Basis</div>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">2.3</div>
                                    <div>Cost Basis</div>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">2.4</div>
                                    <div>Assumptions and Notes</div>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">2.5</div>
                                    <div>Exclusions</div>
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">2.6</div>
                                    <div>Exceptions</div>
                                </li>
                                <li
                                    class="dash-nav-intro"
                                    @click="newMenu('basis')"
                                    role="button"
                                >
                                    <div class="mr-4">
                                        <img
                                            alt="Add Button"
                                            src="~@/assets/img/add_but.png"
                                        />
                                    </div>
                                    <div>Add new field</div>
                                </li>
                            </ul>

                            <!-- End Basis and Assumptions for the Introduction -->

                            <li
                                class="dash-nav-item"
                                v-bind:class="{ active: isActive[2] }"
                                @click="clickMenu(2)"
                                role="button"
                            >
                                <span>Cost Development</span>
                                <img
                                    class="dash-nav-arrow"
                                    alt="Vue logo"
                                    src="~@/assets/img/down-arrow.png"
                                />
                            </li>

                            <!-- Sub list for the Cost Development -->

                            <ul v-if="cost_sub" class="dash-nav-list">
                                <li class="dash-nav-intro" role="button">
                                    <span class="mr-4">3.1</span
                                    ><span
                                        >Direct Cost <br />
                                        Development</span
                                    >
                                </li>
                                <li class="dash-nav-intro" role="button">
                                    <div class="mr-4">3.2</div>
                                    <div>Indirect Cost Development</div>
                                </li>
                                <li
                                    class="dash-nav-intro"
                                    @click="newMenu('cost')"
                                    role="button"
                                >
                                    <div class="mr-4">
                                        <img
                                            alt="Add Button"
                                            src="~@/assets/img/add_but.png"
                                        />
                                    </div>
                                    <div>Add new field</div>
                                </li>
                            </ul>

                            <!-- End Sub list for the Cost Development -->

                            <li
                                class="dash-nav-item"
                                v-bind:class="{ active: isActive[3] }"
                                @click="clickMenu(3)"
                                role="button"
                            >
                                <span>Allowances</span>
                                <img
                                    class="dash-nav-arrow"
                                    alt="Vue logo"
                                    src="~@/assets/img/down-arrow.png"
                                />
                            </li>

                            <!-- Sub List for the Allowances -->

                            <ul v-if="allow_sub" class="dash-nav-list">
                                <li
                                    v-for="(allowance,
                                    index) in allowances_data"
                                    :key="allowance.title"
                                    class="dash-nav-intro"
                                    role="button"
                                >
                                    <span class="mr-4">4.{{ index + 1 }}</span
                                    ><span>{{ allowance.title }}</span>
                                </li>
                                <li
                                    class="dash-nav-intro"
                                    @click="newMenu('allowances')"
                                    role="button"
                                >
                                    <div class="mr-4">
                                        <img
                                            alt="Add Button"
                                            src="~@/assets/img/add_but.png"
                                        />
                                    </div>
                                    <div>Add new field</div>
                                </li>
                            </ul>

                            <!-- End Sub list for the Allowances -->

                            <li
                                class="dash-nav-item"
                                v-bind:class="{ active: isActive[4] }"
                                @click="clickMenu(4)"
                                role="button"
                            >
                                <span>Qualification</span>
                                <img
                                    class="dash-nav-arrow"
                                    alt="Vue logo"
                                    src="~@/assets/img/down-arrow.png"
                                />
                            </li>

                            <!-- Sub List for the Qualification -->

                            <ul v-if="qual_sub" class="dash-nav-list">
                                <li
                                    v-for="(qualification,
                                    index) in qualification_data"
                                    :key="qualification.title"
                                    class="dash-nav-intro"
                                    role="button"
                                >
                                    <span class="mr-4">4.{{ index + 1 }}</span
                                    ><span>{{ qualification.title }}</span>
                                </li>
                                <li
                                    class="dash-nav-intro"
                                    @click="newMenu('qualification')"
                                    role="button"
                                >
                                    <div class="mr-4">
                                        <img
                                            alt="Add Button"
                                            src="~@/assets/img/add_but.png"
                                        />
                                    </div>
                                    <div>Add new field</div>
                                </li>
                            </ul>

                            <!-- End Sub list for the Qualification -->

                            <li
                                class="dash-nav-item"
                                v-bind:class="{ active: isActive[5] }"
                                @click="clickMenu(5)"
                                role="button"
                            >
                                <span>Risk and <br />Opportunities</span>
                                <img
                                    class="dash-nav-arrow"
                                    alt="Vue logo"
                                    src="~@/assets/img/down-arrow.png"
                                />
                            </li>

                            <!-- Sub list for Opportunities -->

                            <ul v-if="opp_sub" class="dash-nav-list">
                                <li
                                    v-for="(opportunities,
                                    index) in opportunities_data"
                                    :key="opportunities.title"
                                    class="dash-nav-intro"
                                    role="button"
                                >
                                    <span class="mr-4">4.{{ index + 1 }}</span
                                    ><span>{{ opportunities.title }}</span>
                                </li>
                                <li
                                    class="dash-nav-intro"
                                    @click="newMenu('opportunities')"
                                    role="button"
                                >
                                    <div class="mr-4">
                                        <img
                                            alt="Add Button"
                                            src="~@/assets/img/add_but.png"
                                        />
                                    </div>
                                    <div>Add new field</div>
                                </li>
                            </ul>

                            <!-- End Sub list for Opportunities -->
                        </ul>
                        <div class="text-center mt-4">
                            <b-button class="bg-white text-dark"
                                >Submit Basis of Estimate</b-button
                            >
                        </div>
                    </div>
                </b-row>
            </div>
        </b-col>
    </b-row>
</template>
<script>
import Introduction from './basisestimate/introuduction';
import Basis from './basisestimate/basis';
import Cost from './basisestimate/cost';
import FirstPage from './basisestimate/firstpage';
import Allowances from './basisestimate/allowances';
import Qualification from './basisestimate/qualification';
import Risk from './basisestimate/risk';

export default {
    name: 'BasisEstimate',
    components: {
        Introduction,
        Basis,
        Cost,
        Allowances,
        Qualification,
        FirstPage,
        Risk,
    },
    data() {
        return {
            step: 100,
            introduction_data: [
                { title: 'Purpose', type: 'old' },
                { title: 'Project Scope Description', type: 'old' },
                { title: 'Project Task Description', type: 'old' },
                { title: 'Background', type: 'old' },
                { title: 'Methodology', type: 'old' },
            ],
            basis_data: [
                { title: 'Design Basis', type: 'old' },
                { title: 'Planning Basis', type: 'old' },
                { title: 'Cost Basis', type: 'old' },
                { title: 'Assumptions and Notes', type: 'old' },
                { title: 'Exclusions', type: 'old' },
                { title: 'Exceptions', type: 'old' },
            ],
            cost_data: [
                { title: 'Direct Cost Development', type: 'old' },
                { title: 'Indirect Cost Development', type: 'old' },
            ],
            allowances_data: [
                { title: 'Bidding Assumptions', type: 'old' },
                { title: 'Project Physical Scope Allowances', type: 'old' },
                { title: 'Contractor & Other Estimate Markups', type: 'old' },
                { title: 'Labor Markup', type: 'old' },
                { title: 'Equipment', type: 'old' },
                { title: 'Subcontactor Markup', type: 'old' },
                { title: 'Sales Tax', type: 'old' },
                {
                    title: 'Contractor Startup Training, and O&M Manuals',
                    type: 'old',
                },
                {
                    title: 'Builder Risk, Liability, and Vehicle Insurance',
                    type: 'old',
                },
                { title: 'Material Shipping and Handling', type: 'old' },
                {
                    title:
                        'Esclation to Midpoint for Labor, Materials, and Subcontractors ',
                    type: 'old',
                },
            ],
            qualification_data: [
                { title: 'Reconciliation', type: 'old' },
                { title: 'Benchmarking', type: 'old' },
                { title: 'Estimate Quality Assurance', type: 'old' },
                { title: 'Estimating Team', type: 'old' },
                { title: 'Limitation of Estimate ', type: 'old' },
                { title: 'Accuracy of Estimate', type: 'old' },
            ],
            opportunities_data: [
                { title: 'Risk and Opportunties', type: 'old' },
                { title: 'Management Reserve', type: 'old' },
                { title: 'Contingencies', type: 'old' },
            ],
            isActive: [true, false, false, false, false, false],
            showMenu: false,
            windowWidth: window.innerWidth,
            intro_sub: false,
            basis_sub: false,
            cost_sub: false,
            allow_sub: false,
            qual_sub: false,
            opp_sub: false,
        };
    },
    methods: {
        clickMenu(index) {
            if (index == 0) {
                if (this.intro_sub) {
                    this.step = 100;
                } else this.step = index;
                this.intro_sub = !this.intro_sub;
                this.basis_sub = false;
                this.allow_sub = false;
                this.qual_sub = false;
                this.cost_sub = false;
                this.opp_sub = false;
            }
            if (index == 1) {
                this.intro_sub = false;
                this.cost_sub = false;
                this.allow_sub = false;
                this.basis_sub = !this.basis_sub;
                this.qual_sub = false;
                this.step = index;
                this.opp_sub = false;
            }
            if (index == 2) {
                this.intro_sub = false;
                this.basis_sub = false;
                this.allow_sub = false;
                this.qual_sub = false;
                this.cost_sub = !this.cost_sub;
                this.step = index;
                this.opp_sub = false;
            }
            if (index == 3) {
                this.intro_sub = false;
                this.basis_sub = false;
                this.cost_sub = false;
                this.qual_sub = false;
                this.allow_sub = !this.allow_sub;
                this.step = index;
                this.opp_sub = false;
            }
            if (index == 4) {
                this.intro_sub = false;
                this.basis_sub = false;
                this.cost_sub = false;
                this.allow_sub = false;
                this.opp_sub = false;
                this.qual_sub = !this.qual_sub;
                this.step = index;
            }
            if (index == 5) {
                this.intro_sub = false;
                this.basis_sub = false;
                this.cost_sub = false;
                this.allow_sub = false;
                this.opp_sub = !this.opp_sub;
                this.qual_sub = false;
                this.step = index;
            }
            this.isActive[index] = true;
            for (var i = 0; i < this.isActive.length; i++) {
                this.isActive[i] = false;
                if (i == index) this.isActive[i] = true;
            }
            this.$forceUpdate();
            this.$emit('selectMenu', index);
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        newMenu(name) {
            window.scrollTo(0, window.innerHeight)
            switch (name) {
                case 'introduction':
                    this.introduction_data.push({ title: '', type: 'new' });
                    break;
                case 'basis':
                    this.basis_data.push({ title: '', type: 'new' });
                    break;
                case 'cost':
                    this.cost_data.push({ title: '', type: 'new' });
                    break;
                case 'allowances':
                    this.allowances_data.push({ title: '', type: 'new' });
                    break;
                case 'qualification':
                    this.qualification_data.push({ title: '', type: 'new' });
                    break;
                case 'opportunities':
                    this.opportunities_data.push({ title: '', type: 'new' });
                    break;
                default:
                    break;
            }
        },
    },
    created: function() {
        if (window.innerWidth < 1000) {
            this.showMenu = true;
        }
    },
};
</script>

<style scoped>
.basis-estimate {
    font-size: 1.1em;
}
.background-card {
    background-color: #e5e5e5;
}
.content-card {
    margin: 20px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    min-height: 80vh;
}

.dash-nav-arrow {
    margin-right: 10px;
}

.dash-nav-item {
    padding: 10px 30px 10px 30px;
    align-items: center;
}

.dash-nav-intro {
    padding: 10px 40px 10px 30px;
    background-color: #1f4069;
    display: flex;
    justify-content: flex-start;
}

li {
    display: flex;
    justify-content: space-between;
}

.dash-nav-list {
    list-style-type: none;
    padding: 0px;
    color: white;
    width: 100%;
    font-weight: normal;
}

.dash-nav {
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    min-height: 83vh;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    background: #0c2340;
}

.nav-upper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.hamberger-menu {
    display: none;
}

.esti-nav-header {
    padding: 30px 15px 10px 15px;
    align-items: center;
    text-align: center;
    font-size: 1.2em;
    display: flex;
    justify-content: center;
    font-weight: bold;
}

.active {
    background-color: #030b16;
}

@media only screen and (max-width: 1000px) {
    .nav-bar {
        order: 10;
    }
    .background-card {
        order: 100;
    }
    .hamberger-menu {
        margin-left: 15px;
        display: block;
    }
    .dash-nav-list {
        display: none;
    }
    .dash-nav {
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        min-height: 8vh;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        background: #0c2340;
    }
}
</style>
