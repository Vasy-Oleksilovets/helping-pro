<template>
  <b-container class="form-section register-categories">
    <b-row class="no-gutters">
      <b-col cols="11" lg="6" class="form-section">
        <p class="char-sub-title">
          Project Experience
          <span class="form-asterisk">*</span> (Select all that apply)
          <span v-if="submitted6 && !experience.length" style="align-items: center; margin-left: 5px">
            <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
            <span style="color:red">Select area of expertise</span>
          </span>
        </p>
        <b-row v-for="cat in categories" v-bind:key="cat.id">
          <b-col>
            <ul class="categ-select-box1" @click="setCategories(); showCategories();">
              <li class="option-title">Category {{ cat.name }}</li>
              <li style="display: flex; justify-content: space-between; align-items: center" v-for="c in cat.list" v-bind:key="c.id" v-bind:value="c.text" class="option-list-item" v-on:click="addExp(c)" role="button">
                <div style="align-items: center">{{ c.text }}</div>
                <div style="padding-right: 10px; font-size:22px;">+</div>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="11" lg="6" class="form-section" style="padding-left: 10px !important">
        <p class="char-sub-title">Your Selections:</p>
        <ul style="color: white" class="categ-selections" v-if="categoriesVisible" v-bind:class="{ show: categoriesVisible }">
          <li v-for="(exp, id) in experience" v-bind:key="exp.id" class="categ-item">
            <b-row class="no-gutters" style="display: flex; justify-content: space-between; padding-left: 10px; padding-right: 10px; padding-top:5px; padding-bottom: 5px">
              <div style="width: 98%">{{ exp.text }}</div>
              <div style="width: 2%">
                <span @click="delExp(id); setCategories(); showCategories();" style="font-weight: 500"><i class="fa fa-times" aria-hidden="true"></i></span>
              </div>
            </b-row>
          </li>
        </ul>
      </b-col>
    </b-row>
    <br />
    <b-row class="no-gutters">
      <b-col cols="11" lg="5" class="form-section mb-4">
        <p class="char-sub-title">Enter any project experience not listed above</p>
        <autocomplete @submit="searchChange($event)" :search="search" placeholder="Enter any project experience" aria-label="Enter any project experience">
          <template #default="{rootProps, inputProps, inputListeners, resultListProps, resultListListeners, results, resultProps}">
            <div v-bind="rootProps">
              <input v-bind="inputProps" v-on="inputListeners" v-model="custom_character"/>
              <ul v-bind="resultListProps" v-on="resultListListeners">
                <li v-for="(result, index) in results" :key="resultProps[index].id" v-bind="resultProps[index]">
                  {{ result }}
                </li>
              </ul>
            </div>
          </template>
        </autocomplete>
      </b-col>
      <b-col cols="11" lg="6" offset-lg="1" class="form-section">
        <p class="char-sub-title">Your Selections:</p>
        <ul style="color: white" class="categ-selections" v-if="projVisible" v-bind:class="{ show: projVisible }" >
          <li v-for="(exp, id) in projexperiences" v-bind:key="exp.id" class="categ-item">
            <b-row class="no-gutters" style="display: flex; justify-content: space-between; padding-left: 10px; padding-right: 10px; padding-top:5px; padding-bottom: 5px">
              <div style="width: 98%">{{ exp }}</div>
              <div style="width: 2%">
                <span @click="delProj(id); setProj(); showProj();" style="font-weight: 500">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </span>
              </div>
            </b-row>
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';

export default {
    name: 'Categories',
    components: {
      Autocomplete,
    },
    props: {
      submitted6: Boolean,
    },
    data() {
      return {
        countries: ['Australia', 'New Zealand', 'South Africa'],
        experience: [],
        categoriesVisible: false,
        projVisible: false,
        categories: [
          {
            name: 'One',
            list: [
              { ID: 1, text: 'Warehouse (10 percent maximum office area, but not exceeding 600 sq. m)' },
              { ID: 2, text: 'Barn, Stable, Storage, Kennel, Shed' },
              { ID: 3, text: 'Parking Garage (free-standing)' },
              { ID: 4, text: 'Shopping Center, Large Mercantile Store, Factory (excluding tenant fit-up)'},
            ],
          },
          {
            name: 'Two',
            list: [
              { ID: 5, text: 'Multiple Housing, e.g., Condominium, Co-operative and Rental Apartment Building' },
              { ID: 6, text: 'Institutional Residence, e.g., Dormitory, Parks Bunkhouse' },
              { ID: 7, text: 'Motel, Motor Inn' },
            ],
          },
          {
            name: 'Three',
            list: [
                { ID: 8, text: 'General Purpose Office Building' },
                { ID: 9, text: 'Armed Forces Base and Yard, Armory, Drill Hall, Aircraft Hangar' },
                { ID: 10, text: 'Summer Camp, Resort Building, Trailer Park, Marina' },
                { ID: 11, text: 'Elementary Schools, Day Care Centers' },
                { ID: 12, text: 'Specialized Airport Facility, e.g., Security Control, Garbage Incinerator, Electronic Maintenance, Aircraft Garbage Dump Station, Aircraft De-Icing Station' },
                { ID: 13, text: 'Freight Handling Facility' },
                { ID: 14, text: 'Bowling Alley' }
            ]
          },
          {
            name: 'Four',
            list: [
              { ID: 15, text: 'Defined Purpose Office Building' },
              { ID: 16, text: 'Bank, Stock Exchange' },
              { ID: 17, text: 'Swimming Pool (indoor), Ice Arena (indoor), Gymnasium, Covered Ice Rink' },
              { ID: 18, text: 'Sports and Fitness Facility, Recreational Building' },
              { ID: 19, text: 'Grandstand, Stadium, Arena' },
              { ID: 20, text: 'Convention Hall, Exhibition Building, Hotel' },
              { ID: 21, text: 'Manufacturing, Processing or Specialized Storage Plant, Postal Plant, Abattoir, Distillery' },
              { ID: 22, text: 'Ambulance Station, Fire Station, Post Office' },
              { ID: 23, text: 'Restaurant, Bar, Lounge' },
              { ID: 24, text: 'Minimum Security Correctional Institution' },
              { ID: 25, text: 'Club Building, Country Club, Community Centre, Golf Club House' },
              { ID: 26, text: 'Tenant Fit-up, Space Planning' },
              { ID: 27, text: 'Maintenance Building, Service Garage, Gas and Fuel Station, Car Dealership' },
              { ID: 28, text: 'Place of Worship, Monastery,Convent' },
              { ID: 29, text: 'Central Utility Plant' },
              { ID: 30, text: 'Junior and Senior High School' },
            ],
          },
          {
            name: 'Five',
            list: [
              { ID: 31, text: 'Terminal Building or Station, e.g., Air, Bus, Ferry, Rail' },
              { ID: 32, text: 'Police Station, Customs and Immigration Building' },
              { ID: 33, text: 'Cemetery Chapel, Mausoleum, Crematorium, Funeral Home, Undertaking Establishment' },
              { ID: 34, text: 'Concert Halls, Performing Arts Facilities, Theatre' },
              { ID: 35, text: 'City Hall, Town Hall, Chancery' },
              { ID: 36, text: 'Parliament Building, Mint, Treasury' },
              { ID: 36, text: 'Courthouse, Archives Building, Library' },
              { ID: 37, text: 'Medium Security and Multi-level Security Correctional Institution' },
              { ID: 38, text: 'Casinos and Gaming Facilities' },
              { ID: 39, text: 'Extended Care, Convalescent, Geriatrics Nursing Facility' },
              { ID: 40, text: 'Amusement Park Building, Zoo, Botanical Garden' },
              { ID: 41, text: 'University and College Teaching Buildings' },
              { ID: 42, text: 'Specialized Agricultural Building, e.g., Dairy Barn, Swine Operation, Poultry Laying House ' },
            ],
          },
          {
            name: 'Six',
            list: [
              { ID: 43, text: 'Hospital, Chronic Care Facility, Psychiatric Facility, Medical Research Facility, Dental Building, Clinics e.g., Veterinary Health, Radiology' },
              { ID: 44, text: 'Communications Building, Radio or TV Facility' },
              { ID: 45, text: 'Art Gallery, Museum, Observatory, Planetarium, Aquarium' },
              { ID: 46, text: 'Science Building, Laboratory Building, Weather Station' },
              { ID: 47, text: 'Combined Flight Services/Passenger Services Building' },
              { ID: 48, text: 'Radar Building, Air Traffic Services School, Meteorological Services Building' },
              { ID: 49, text: 'Specialized Parks Building, e.g., Park Administration Building, Beach Change House and Washrooms, Amphitheatre, Park Warden Station, Kitchen Shelter' },
              { ID: 50, text: 'Official Government Residence, Consulate, Embassy, Custom Residence, Custom Swimming Pool' },
            ],
          },
          {
            name: 'Seven',
            list: [
              { ID: 50, text: 'Emergency Operations Centre' },
              { ID: 51, text: 'Decorative Work, Exhibition Display, Public Garden, Promenade, Fountain, Commemorative and Funeral Monument, Fortifications' },
              { ID: 52, text: 'Air Traffic Control Tower' },
              { ID: 53, text: 'Opera House' },
              { ID: 54, text: 'Critical Care Facility' },
              { ID: 55, text: 'Data Centre and Computer Centre' },
              { ID: 56, text: 'Maximum Security Correctional Institution' },
            ],
          },
        ],
        //Valuse for any project experience not listed above
        other_experiences: [
          { ID: 1, value: 'Submarine' },
          { ID: 2, value: 'Store' },
          { ID: 3, value: 'Stall' },
        ],
        //Data for array to save the list of the other experiences [{ID: 1, value: 'Submarine'},{ID: 2, value: 'Safari'}]
        projexperiences: [],
        results: [],
        //Custom_Character from the autocomplex box to add the project experiences list
        custom_character: '',
      };
    },

    methods: {
        receiveResult(input) {
          return new Promise(resolve => {
            new EstimatorProxy()
              .searchExpertiseSubcategories(input)
              .then(response => {
                const result = response.data;
                let spread_data = [];
                for (var index = 0; index < result.length; index++) {
                  spread_data.push(result[index].name);
                }
                resolve(spread_data);
              })
              .catch(e => {});
          });
        },
        async search(input) {
          this.custom_character = input;
          if (input.length < 1) {
            return [];
          }
          const results = await this.receiveResult(input);
          return results.filter(element => {
            return element.toLowerCase().startsWith(input.toLowerCase());
          });
        },
        delExp(id) {
          this.$delete(this.experience, id);
        },
        delProj(id) {
          this.$delete(this.projexperiences, id);
          let result = [];
          for (let proj of this.projexperiences) {
            result.push(proj.ID);
          }
          this.$emit('otherExperience', result);
        },
        addExp1(cat) {
          var exp1 = cat.text;
          var exp = exp1.toString();
          if (this.experience.includes(exp) == false) {
            this.experience = [...this.experience, exp];
          }
        },
        addExp(cat) {
          if (this.experience.includes(cat) == false) {
            this.experience = [...this.experience, cat];
          }
        },
        setCategories() {
          var experiences = this.experience;
          let send_data = [];
          for (let experience of experiences) {
            send_data.push(experience.ID);
          }
          this.$emit('exp', send_data);
        },
        setProj() {},

        showCategories() {
          //alert(this.categoriesVisible);
          if (this.experience.length < 1) {
            this.categoriesVisible = !this.categoriesVisible;
          } else {
            this.categoriesVisible = true;
          }
          //alert(this.categoriesVisible);
        },
        showProj() {
          //alert(this.categoriesVisible);
          if (this.projexperiences.length < 1) {
            this.projVisible = !this.projVisible;
          } else {
            this.projVisible = true;
          }
          //alert(this.categoriesVisible);
        },
        searchChange(event) {
          if (event) {
            for (let category of this.categories) {
              for (let item of category.list) {
                if (item.text == event) {
                  if (this.experience.includes(item)) return;
                  this.experience.push(item);
                }
              }
            }
          }
          var i = 0, flag = false;
          for (let category of this.categories) {
            for (let item of category.list) {
              if (item.text === this.custom_character) {
                if (this.experience.includes(item)) return;
                this.experience.push(item);
                flag = true;
              }
            }
          }
          if (flag == false && event == undefined) {
            if (this.projexperiences.includes(this.custom_character)) return;
            this.projexperiences.push(this.custom_character);
            this.setProj();
            this.showProj();
          }
          this.setCategories();
          this.showCategories();
          this.$emit('otherExperience', this.projexperiences);
          this.custom_character = "";
        },
    },
};
</script>

<style scoped>
[data-position='below'] .autocomplete-result-list {
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  z-index: 100 !important;
}

.give-space {
  display: flex;
  justify-content: space-between;
}

.form-asterisk {
  color: #dd7b26;
}

.categ-del-selection {
    /* position: absolute; */
  top: 50% !important;
}

.categ-line-item {
  padding-left: 10px;
}

.categ-select-box1 {
  border: 1.5px solid #c9c9c9;
  box-sizing: border-box;
  list-style-type: none;
  overflow-y: scroll;
  padding-left: 0px;
  height: 168px;
}

.categ-selections {
  list-style-type: none;
  width: 100%;
  height: 317px;
  border: 1.5px solid #c9c9c9;
  overflow-y: scroll;
  overflow-x: hideen;
  padding-left: 0px;
}
.categ-item {
  background: #f3f3f3;
  border-bottom: 2px solid white;
  overflow-x: hidden;
  color: white !important;
}
.reg-select-box1 {
  border: 1.5px solid #c9c9c9;
  box-sizing: border-box;
  border-radius: 3px;

  width: 400px;
  height: 40px;

  margin-top: 14px;
  margin-bottom: 14px;
  margin-right: 21px;

  padding-left: 5px;
}
.form-area {
  width: 500px;
  height: 200px;
  border: 1.5px solid #c9c9c9;
  padding: 5px;
}

.option-title {
  position: sticky;
  top: 0px;
  background-color: white;
  width: 100%;
  height: 32px;
  padding-left: 13px;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #000000;
}

.option-list-item {
  background: #f3f3f3;
  padding: 5px;
  border-bottom: 2px solid white;
  padding-left: 18px;
}
.form-section {
  padding: 0px;
}

.no-gutters {
  margin-left: 0px;
  margin-right: 0px;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 0px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 10px;
  width: 90%;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: grey;
}
.fa-plus {
  font-size: 14px;
}

@media only screen and (max-width: 600px) {
  .no-gutters {
    margin: 10px;
  }
}
</style>
