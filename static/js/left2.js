// 初始化echart实例对象
//
var left2Chart = echarts.init(document.getElementById('left2'),'light');

// 指定图表的配置项和数据
// ----------左2的配置项-------------------
// prettier-ignore
var hours = ['2004','2005','2006','2007','2008','2009','2010','2011','2012',
'2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'];
// prettier-ignore
var days = ['森林储蓄量','活立木总储蓄量'];
// prettier-ignore
var option = {
  title: {
        text: '森林资源趋势',
        textStyle: {
            color: 'white',
        },
        left: 'left',
    },
  tooltip: {
    trigger: 'axis3D',
        //指示器
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#7171C6'
            }
        },
  },
  legend: {
        show: true,
      textStyle: {
            color: 'white',
        }
    },
  visualMap: {
    max: 3,
    inRange: {
      color: [
        '#599531',
        '#5db445',
        '#74d183',
        '#abe9cf',
        '#e0f8f7',
        '#bfdfff',
        '#90bcfe',
        '#6176fd',
        '#4346f4',
        '#6227d7',
        '#6300a5'
      ]
    }
  },
  xAxis3D: {
    type: 'category',
    data: hours,
    axisLabel: {
      lineStyle: {
        color: 'white',
      },
      textStyle: {
        color: 'white' // 设置 x 轴字体颜色为红色
      }
    }// ['03.20', '03.21', '03.22']
  },
  yAxis3D: {
    type: 'category',
    data: days,
    axisLabel: {
      lineStyle: {
        color: 'white',
      },
      textStyle: {
        color: 'white' // 设置 x 轴字体颜色为红色
      }
    }// ['03.20', '03.21', '03.22']
  },
  zAxis3D: {
    type: 'value',
    axisLabel: {
      lineStyle: {
        color: 'white',
      },
      textStyle: {
        color: 'white' // 设置 x 轴字体颜色为红色
      }
    }// ['03.20', '03.21', '03.22']
  },
  grid3D: {
    boxWidth: 400,
    boxDepth: 200,
    viewControl: {
      // projection: 'orthographic'
    },
    light: {
      main: {
        intensity: 1.2,
        shadow: false
      },
      ambient: {
        intensity: 0.3
      }
    }
  },
  series: [
    {
      type: 'bar3D',
      name: '森林储蓄量',
      data: [],
      shading: 'lambert',
      label: {
        fontSize: 16,
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20,
          color: '#22b9f5'
        },
        itemStyle: {
          color: '#29e8dd'
        }
      }
    },
      {
      type: 'bar3D',
        name: '活立木总储蓄量',
      data: [],
      shading: 'lambert',
      label: {
        fontSize: 16,
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20,
          color: '#22b9f5'
        },
        itemStyle: {
          color: '#29e8dd'
        }
      }
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。

var index=0;
for (var day of data3) {
    // 将每个省的累计确诊病例数添加到配置项的data中
    var da=[index,0,day.confirm];
    var ta=[index,1,day.heal];
    option.series[0].data.push(da);
    option.series[1].data.push(ta);
    index++;
}
left2Chart.setOption(option);