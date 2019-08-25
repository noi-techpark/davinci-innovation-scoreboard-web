<script>
import { AXES_FONT_FAMILY, AXES_FONT_COLOR, AXES_FONT_SIZE, AXES_PADDING } from '@/components/charts/config'
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
                  fontFamily: AXES_FONT_FAMILY,
                  fontColor: AXES_FONT_COLOR,
                  fontSize: AXES_FONT_SIZE,
                  padding: AXES_PADDING
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
                  fontFamily: AXES_FONT_FAMILY,
                  fontColor: AXES_FONT_COLOR,
                  fontSize: AXES_FONT_SIZE,
                  padding: AXES_PADDING
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
