<template>
  <div class="home-notice">
    <v-card
      :ripple="{ class: null }"
      elevation="10"
      class="card-noborder"
      :class="cardNightClass"
    >
      <div class="home-title2 home-body2">
        <v-icon>mdi-chart-bar</v-icon> {{ $t("home.faclOv") }}
      </div>
      <div class="home-body">
        <v-container>
          <v-row no-gutters>
            <template v-for="n in 3">
              <v-col :key="n" class="center x">
                <span
                  class="stat text-darken-4 font-bold"
                  :class="cxt(n)"
                  v-if="n == 1"
                  >{{   getStatData(2)}}</span
                >
                <span
                  class="stat text-darken-4 font-bold"
                  :class="cxt(n)"
                  v-if="n == 2"
                  >{{ getStatData(2) }}</span
                >
                <span
                  class="stat text-darken-4 font-bold"
                  :class="cxt(n)"
                  v-if="n == 3"
                  >{{ getStatData(3) }}</span
                >
                <span >
                  <br />
                  <v-progress-linear
                    :color="cx(n)"
                    height="15"
                    value="60"
                    striped
                    rounded
                  />
                  {{getStatCaption(n)}}
                </span>
              </v-col>
                  

              <v-responsive
                v-if="n % 3 == 0"
                :key="`width-${n}`"
                width="100%"
              ></v-responsive>
            </template>
          </v-row>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script>
import {
  getRegisteredTouristCnt,
  getEmployeeCount,
  getShowCount,
} from "../../apis/homepage";
export default {
  components: {},
  name: "HomepageOverview",
  props: {
    drawer: Boolean,
  },
  data: () => {
    return {
        registeredTouristCnt: '--',
        staffCnt: '--',
        showCnt: '--',
    };
  },
  methods: {
    cx(i) {
      if (i == 1) {
        return "green darken-3";
      }
      if (i == 2) {
        return "amber darken-3";
      }
      if (i == 3) {
        return "blue darken-3";
      }
    },
    cxt(i) {
      if (i == 1) {
        return "green--text";
      }
      if (i == 2) {
        return "orange--text";
      }
      if (i == 3) {
        return "blue--text";
      }
    },
    fetchRegisteredTouristCnt() {
      getRegisteredTouristCnt().then((response) => {
        this.registeredTouristCnt = response.data.count;
      });
    },
    fetchEmployeeCnt() {
      getEmployeeCount().then((response) => {
        this.staffCnt = response.data.count;
      });
    },
    fetchShowCnt() {
      getShowCount().then((response) => {
        this.showCnt = response.data.count;
      });
    },
    getStatData(x) {
      if (x === 1) {
        return this.showCnt;
      }
      if (x === 2) {
        return this.staffCnt;
      }
      if (x === 3) {
        return this.registeredTouristCnt;
      }

      return Math.floor(Math.random() * 1024);
    },
    getStatCaption(x) {
      if (x == 1) {
        return "当前员工总数";
      }
      if (x == 2) {
        return "游客总量";
      }
      if (x == 3) {
        return "当前已举办演出总数";
      }
    },
  },
  created() {
    setTimeout(() => {
      this.fetchRegisteredTouristCnt();
      this.fetchEmployeeCnt();
      this.fetchShowCnt();
    }, 1000);
  },
  computed: {
    cardNightClass() {
      return {
        "cardcolor-light": !this.$vuetify.theme.dark,
        "cardcolor-dark": this.$vuetify.theme.dark,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.stat {
  font-family: "benderregular";
  font-size: 25px;
}
.home-notice {
  margin: 0px 20px 0px 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.home-center {
  text-align: center;
}
.card-noborder {
  border-width: 0px;
}
.home-title2 {
  font-size: 18px;
  font-weight: bold;
  display: block;
}
.home-body {
  margin-left: 7%;
  margin-right: 7%;
  padding-top: 10px;
  padding-bottom: 10px;
  background: transparent;
}
.home-body2 {
  margin-left: 5%;
  margin-right: 5%;
  padding-top: 20px;
  padding-bottom: 10px;
}
.x {
  margin-right: 25px;
}
.font-bold {
  font-weight: bold;
}
</style>
