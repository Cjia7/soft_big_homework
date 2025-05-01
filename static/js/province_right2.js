// 初始化echart实例对象
//
var left2Chart = echarts.init(document.getElementById('right2'),'light');

// 指定图表的配置项和数据
// ----------左2的配置项-------------------
var option = {
    title: {
        text: '废弃污染物排放量(万吨)',
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
    //图例
    legend: {
        left: 'right',
        textStyle: {
            color: 'white',
        }
    },
    //图形位置
    grid: {
        left: '4%',
        right: '6%',
        bottom: '4%',
        top: 50,
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: [],
        axisLabel: {
            textStyle: {
                color: 'white' // 设置 x 轴字体颜色为红色
            }
        }// ['03.20', '03.21', '03.22']
    }],
    yAxis: [{
        type: 'value',
        //y轴字体设置
        axisLabel: {
            show: true,
            color: 'white',
            fontSize: 12,
            formatter: function(value) {
                if (value >= 1000) {
                    value = value / 1000 + 'k';
                }
                return value;
            }
        },
        //y轴线设置显示
        axisLine: {
            show: true
        },
        //与x轴平行的线样式
        splitLine: {
            show: true,
            lineStyle: {
                color: '#17273B',
                width: 1,
                type: 'solid',
            }
        }
    }],
    series: [{
        name: '氮氧化物',
        type: 'line',
        smooth: true,
        data: [] // [20, 406, 529]
    }, {
        name: '二氧化硫',
        type: 'line',
        smooth: true,
        data: [] // [25, 75, 122]
    }]
};



for (var day of data5) {
    // 将每个省的累计确诊病例数添加到配置项的data中
    option.xAxis[0].data.push(day.date)
    option.series[0].data.push(day.confirm)
    option.series[1].data.push(day.heal)
}

// 使用刚指定的配置项和数据显示图表。
left2Chart.setOption(option);