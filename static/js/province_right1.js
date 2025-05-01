// 初始化echart实例对象
var left1Chart = echarts.init(document.getElementById('right1'),'light');

// 指定图表的配置项和数据
// ----------左1的配置项-------------------
var days = ['工业治理污染完成投资','废弃治理投资','废水治理投资'];
var hours = ['2004','2005','2006','2007','2008','2009','2010','2011','2012',
'2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'];
option = {
  tooltip: {
      trigger: 'axis',
        //指示器
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#7171C6'
            }
        },
  },
   backgroundColor: 'transparent',
  legend: {
        show: true,
      textStyle: {
            color: 'white',
        }
    },
  visualMap: {
    show: false,
    dimension: 2,
    min: 0,
    max: 500000,
    inRange: {
      color: [
        '#5e9531',
        '#64b445',
        '#74d179',
        '#abe9bd',
        '#e0f8ee',
        '#bfe9ff',
        '#90c7fe',
        '#618dfd',
        '#4360f4',
        '#7627d7',
        '#6e00a5'
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
      }
  },
  yAxis3D:  [
   {
     type: 'category',  // 第一个 Y 轴
     data: days,
       axisLabel: {
          lineStyle: {
              color: 'white',
          },
          textStyle: {
              color: 'white' // 设置 x 轴字体颜色为红色
          }
      }
   }
],
  zAxis3D: {
    type: 'value',
      axisLabel: {
          lineStyle: {
              color: 'white',
          },
          textStyle: {
              color: 'white' // 设置 x 轴字体颜色为红色
          }
      }
  },
  grid3D: {
    viewControl: {
      projection: 'orthographic'
    }
  },
  series: [
    {
        name: '工业治理污染完成投资',
        type: 'line3D',
        data: [],
        lineStyle: {
            width: 4, // 设置第一条线的宽度为2像素
            smooth: true,
        }
    },
    {
        name: '废弃治理投资',
        type: 'line3D',
        data: [],
        lineStyle: {
            width: 4, // 设置第一条线的宽度为2像素
            smooth: true,
        }
    },
    {
        name: '废水治理投资',
        type: 'line3D',
        smooth: true,
        data: [],
        lineStyle: {
            width: 4, // 设置第一条线的宽度为2像素
            smooth: true,
        }
    },
  ]
};


// 遍历每一天的数据
var index=0;
for (var day of data4) {
    var d1=[index,0,day.confirm];
    var d2=[index,1,day.heal];
    var d3=[index,2,day.dead];
    option.series[0].data.push(d1);
    option.series[1].data.push(d2);
    option.series[2].data.push(d3);
    index++;
}

// 使用刚指定的配置项和数据显示图表。
left1Chart.setOption(option);