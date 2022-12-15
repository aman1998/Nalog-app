export const getDefaultVariablePieOptions = (isMobile: boolean): any =>  ({
  chart: {
    margin: [0, 0, 0, 0],
    spacingTop: 0,
    spacingBottom: 0,
    spacingLeft: 0,
    spacingRight: 0,
    type: 'variablepie',
    backgroundColor: isMobile ? '#fff' : '#fff',
    height:'100%'
  },
  title: {
    text: ''
  },
  tooltip: {
    headerFormat: '',
    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
      `<b>{point.percent}%</b>`
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: false
      }
    },
    variablepie: {
      size:'100%',
      height: '100%',
      dataLabels: {
        enabled: false
      }
    }
  },
});
