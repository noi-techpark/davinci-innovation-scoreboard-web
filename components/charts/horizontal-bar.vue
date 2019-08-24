<script>
import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: '#000',
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontSize: 15,
                  padding: 10
                },
                stacked: true
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  fontColor: '#000',
                  fontFamily: '"Source Sans Pro", sans-serif',
                  fontSize: 15,
                  padding: 10
                },
                stacked: true
              }
            ]
          }
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
