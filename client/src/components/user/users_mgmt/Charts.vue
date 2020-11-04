<template>
  <section class="charts">
    <div class="buttons">
      <select v-model="setDays">
        <option disabled value>Choose one</option>
        <option value="30">Last Month</option>
        <option value="90">Last Quarter</option>
        <option value="182">Half Year</option>
        <option value="365">Last year</option>
      </select>
    </div>
    <apexChart width="100%" height="350" type="bar" :options="chartOptions" :series="series"></apexChart>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
import { filterClientsByTime } from "../../../shared/helpers";
export default {
  name: "Charts",
  props: ["clients"],
  components: { apexChart: VueApexCharts },
  data() {
    return {
      setDays: 30,
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "bar",
          height: 350,
          zoom: {
            type: "x",
            autoScaleYaxis: true
          }
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: "#999",
              label: {
                show: true,
                text: "Support",
                style: {
                  color: "#fff",
                  background: "#00E396"
                }
              }
            }
          ],
          xaxis: [
            {
              x: new Date().getTime(),
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "Today",
                style: {
                  color: "#fff",
                  background: "#775DD0"
                }
              }
            }
          ]
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: "hollow"
        },
        xaxis: {
          type: "datetime"
          // min: new Date().getTime() - 30 * 60 * 60 * 60 * 1000,
        },
        title: {
          text: "Clients chart",
          align: "left",
          margin: 10,
          offsetX: 20,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Baloo Thambi 2",
            color: "darkblue"
          }
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy"
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "15%"
          }
        },
        fill: {
          type: "solid",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        }
      }
    };
  },

  computed: {
    ...mapGetters(["clientData"]),
    series() {
      return [
        {
          data: filterClientsByTime(this.clients, this.setDays),
          name: "clients"
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.charts {
  max-width: 900px;
  margin: auto;
}
.buttons {
  text-align: center;
}
button {
  @include primary-btn;
  font-size: 14px;
  padding: 3px 8px;
  margin: 5px;
}
@media (min-width: 500px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1000px) {
}
</style>
