<script>
import { Line, mixins } from 'vue-chartjs'
import {
  AXES_FONT_FAMILY,
  AXES_FONT_COLOR,
  AXES_FONT_SIZE,
  AXES_PADDING
} from '@/components/charts/config'
const { reactiveProp } = mixins

export default {
  extends: Line,
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
                  display: true,
                  drawBorder: false
                },
                ticks: {
                  beginAtZero: true,
                  fontColor: AXES_FONT_COLOR,
                  fontFamily: AXES_FONT_FAMILY,
                  fontSize: AXES_FONT_SIZE,
                  padding: AXES_PADDING
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  drawBorder: false
                },
                ticks: {
                  fontColor: AXES_FONT_COLOR,
                  fontFamily: AXES_FONT_FAMILY,
                  fontSize: AXES_FONT_SIZE,
                  padding: AXES_PADDING
                }
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
