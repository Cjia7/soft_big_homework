 var myChart = echarts.init(document.getElementById('left'))
    var option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
      title: {
    text: '中国人均土地占有量',
        left: 'center',
        textStyle: {
      color: '#f4fff3'
        },
      },
      axisLabel:{
    color: "#f4fff3"
      },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    splitLine: false,
    axisLine:{
      lineStyle:{
        color: "#f4fff3",
      }
    }
  },
  yAxis: {
    type: 'category',
    data: ['建设用地', '湿地', '草地', '林地', '园地', '耕地'],
    axisLine:{
      lineStyle:{
        color: "#f4fff3",
      }
    }
  },
  series: [
    {
      name: '全民所有',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [22, 92, 74, 39, 13, 17],
      color: ['#01641c'],
    },
    {
      name: '全国剩余总数',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [78, 8, 26, 61, 87, 83],
      color: ['#96b97d'],
    }
  ]
};
    myChart.setOption(option);

    var myChart2 = echarts.init(document.getElementById('right'))
    var option2 = {
  title:{
    text: '2023世界PM2.5平均浓度',
    textStyle: {
      color: 'white'
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      axisLine:{
        lineStyle:{
          color: 'white'
        },
      },
      type: 'category',
      data: ['中国', '土耳其', '智利', '孟加拉国', '美国', '加拿大', '卡塔尔'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine:{
        lineStyle:{
          color: 'white'
        },
      },
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [32.5, 20.3, 18.8, 79.9, 9.1, 10.3, 37.6],
      color: ['#96b97d'],
    }
  ]
};
    myChart2.setOption(option2);