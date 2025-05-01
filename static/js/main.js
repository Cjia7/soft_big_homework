const colors = ['#5470C6', '#91CC75', '#EE6666'];
function rsz() {
    var zoom = $(window).width() / 1920;
    document.body.style.zoom = zoom;


}
$(function() {
    rsz();
    leftTopCharts();
    leftBottomCharts();
    centerTopCharts();
    rightTopCharts();
    rightBottomCharts();
    // itv();
    // setInterval("itv()", 1000);
});
$(window).resize(function() {
    rsz();
});

/**
 * 左上角第一个图表：订单品类占比（备选）
 */
function leftTopChartsBak() {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart1'));

    var colorList = [{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                    offset: 0,
                    color: 'rgba(51,192,205,0.01)' // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: 'rgba(51,192,205,0.57)' // 100% 处的颜色
                }
            ],
            globalCoord: false // 缺省为 false
        },
        {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                    offset: 0,
                    color: 'rgba(115,172,255,0.02)' // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: 'rgba(115,172,255,0.67)' // 100% 处的颜色
                }
            ],
            globalCoord: false // 缺省为 false
        },
        {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [{
                    offset: 0,
                    color: 'rgba(158,135,255,0.02)' // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: 'rgba(158,135,255,0.57)' // 100% 处的颜色
                }
            ],
            globalCoord: false // 缺省为 false
        },
        {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
                    offset: 0,
                    color: 'rgba(252,75,75,0.01)' // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: 'rgba(252,75,75,0.57)' // 100% 处的颜色
                }
            ],
            globalCoord: false // 缺省为 false
        },
        {
            type: 'linear',
            x: 1,
            y: 1,
            x2: 1,
            y2: 0,
            colorStops: [{
                    offset: 0,
                    color: 'rgba(253,138,106,0.01)' // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: '#FDB36ac2' // 100% 处的颜色
                }
            ],
            globalCoord: false // 缺省为 false
        },
        {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
                    offset: 0,
                    color: 'rgba(254,206,67,0.12)' // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: '#FECE4391' // 100% 处的颜色
                }
            ],
            globalCoord: false // 缺省为 false
        }
    ]
    var colorLine = ['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43']

    function getRich() {
        let result = {}
        colorLine.forEach((v, i) => {
            result[`hr${i}`] = {
                backgroundColor: colorLine[i],
                borderRadius: 3,
                width: 3,
                height: 3,
                padding: [3, 3, 0, -12]
            }
            result[`a${i}`] = {
                padding: [8, -60, -20, -20],
                color: colorLine[i],
                fontSize: 12
            }
        })
        return result
    }
    let data = [{
        'name': '北京',
        'value': 25
    }, {
        'name': '上海',
        'value': 20
    }, {
        'name': '广州',
        'value': 18
    }, {
        'name': '深圳',
        'value': 15
    }, {
        'name': '未知',
        'value': 13
    }, {
        'name': '海外',
        'value': 9
    }].sort((a, b) => {
        return b.value - a.value
    })
    data.forEach((v, i) => {
        v.labelLine = {
            lineStyle: {
                width: 1,
                color: colorLine[i]
            }
        }
    })
    option = {
        // 图例
        legend: {
            orient: 'horizontal', // 布局方式，默认为水平布局，可选为：
            // 'horizontal' ¦ 'vertical'
            x: 'center', // 水平安放位置，默认为全图居中，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'bottom', // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc', // 图例边框颜色
            borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
            padding: 5, // 图例内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
            // 横向布局时为水平间隔，纵向布局时为纵向间隔
            itemWidth: 20, // 图例图形宽度
            itemHeight: 14, // 图例图形高度
            textStyle: {
                color: '#fff', // 图例文字颜色
                fontSize: 18, // 图例文字大小
            }
        },
        series: [{
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            clockwise: true,
            avoidLabelOverlap: true,
            label: {
                show: true,
                position: 'outside',
                formatter: function(params) {
                    const name = params.name
                    const percent = params.percent + '%'
                    const index = params.dataIndex
                    return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
                },
                rich: getRich()
            },
            itemStyle: {
                normal: {
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            data,
            roseType: 'radius'
        }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

/**
 * 左上角第一个图表：订单品类占比
 */
function leftTopCharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart1'));

    var option = {
        // 图例
        legend: {
            orient: 'horizontal', // 布局方式，默认为水平布局，可选为：
            // 'horizontal' ¦ 'vertical'
            x: 'center', // 水平安放位置，默认为全图居中，可选为：
            // 'center' ¦ 'left' ¦ 'right'
            // ¦ {number}（x坐标，单位px）
            y: 'bottom', // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            // ¦ {number}（y坐标，单位px）
            backgroundColor: 'rgba(0,0,0,0)', // 背景颜色
            borderColor: '#ccc', // 图例边框颜色
            borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
            padding: 5, // 图例内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
            // 横向布局时为水平间隔，纵向布局时为纵向间隔
            itemWidth: 20, // 图例图形宽度
            itemHeight: 14, // 图例图形高度
            textStyle: {
                color: '#fff', // 图例文字颜色
                fontSize: 18, // 图例文字大小
            }
        },
        title: {
            text: '30%',
            left: 'center',
            top: '46.5%',
            textStyle: {
                fontSize: 16,
                color: '#3C4353',
                fontStyle: 'normal',
                fontWeight: '400',
                fontFamily: 'PingFangSC-Regular,PingFang SC;',
            }
        },
        color: ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            name: '统计',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
                show: true,
                formatter: '{d}%',
            },
            emphasis: {
                label: {
                    show: true
                }
            },
            data: [{
                    value: 13315000,
                    name: '美国'
                },
                {
                    value: 10126000,
                    name: '俄罗斯'
                },
                {
                    value: 8950000,
                    name: '沙特阿拉伯'
                },
                {
                    value: 4971000,
                    name: '加拿大'
                },
                {
                    value: 4375000,
                    name: '伊拉克'
                },
                {
                    value: 4176000,
                    name: '中国'
                },
                {
                    value: 37009000,
                    name: '其他'
                },
            ]
        } ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

/**
 * 左下角第二个图表：投诉排名
 */
function leftBottomCharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart2'));
    var option = {
        grid: {
            // left: '5%',
            // right: '5%',
            // bottom: '5%',
            top: '0',
            containLabel: true
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            },
            formatter: function(params) {
                console.log(params);
                return params[0].name + '<br/>' +
                    "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                    params[0].seriesName + ' : ' + params[0].value + ' %<br/>'
            }
        },
        // backgroundColor: 'rgb(20,28,52)', // 图表背景颜色
        xAxis: {
            show: false,
            type: 'value',
        },
        yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize: 20, // 分类文字大小
                },
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            data: ['美国', '俄罗斯', '伊朗', '中国', '卡塔尔', '加拿大']
        }, {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
                textStyle: {
                    color: '#0cfcfc',
                    fontSize: 16, // 比例文字大小
                },
                formatter: function(value) {
                    // if (value >= 10000) {
                    //     return (value / 10000).toLocaleString() + '%';
                    // } else {
                    console.log(value);
                    return value.toLocaleString() ;
                    // }
                },
            },
            data: [934200,701700,256700,209200,177000,172300]
        }],
        series: [{
                name: '产量',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: 'rgb(7,182,208,1)'
                        }, {
                            offset: 1,
                            color: 'rgb(6,120,207,1)'
                        }]),
                    },
                },
                barWidth: 20,
                data: [24,20,5,4,3,3]
            },
            {
                name: '背景',
                type: 'bar',
                barWidth: 20,
                barGap: '-100%',
                data: [100, 100, 100, 100, 100,100],
                itemStyle: {
                    normal: {
                        color: 'rgba(24,31,68,1)',
                        barBorderRadius: 30,
                    }
                },
            },
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function centerTopCharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart3'));
    var data = [{
            "time": 2023,
            "data": [{
                    "name": "United States",
                    "value": [5348263388, 1, "美国"]
                },
                {
                    "name": "Russia",
                    "value": [1622370906, 1, "俄国"]
                },
                {
                    "name": "Japan",
                    "value": [1219729576, 1, "日本"]
                },
                {
                    "name": "Germany",
                    "value": [796843827, 1, "德国"]
                },
                {
                    "name": "Korea",
                    "value": [635065365, 1, "韩国"]
                },
                {
                    "name": "India",
                    "value": [2296914863, 1, "印度"]
                },
                {
                    "name": "Canada",
                    "value": [570574281, 1, "加拿大"]
                },
                {
                    "name": "China",
                    "value": [9824033116, 1, "中国"]
                },
                {
                    "name": "Iran",
                    "value": [630336215, 1, "伊朗"]
                },
                {
                    "name": "Arabia",
                    "value": [669072093, 1, "阿拉伯"]
                }
            ]
        },
        {
            "time": 2010,
            "data": [{
                    "name": "United States",
                    "value": [6120986377, 1, "美国"]
                },
                {
                    "name": "Japan",
                    "value": [1299863649, 1, "日本"]
                },
                {
                    "name": "Russia",
                    "value": [1606044349, 1, "俄国"]
                },
                {
                    "name": "Germany",
                    "value": [851776855,1, "德国"]
                },
                {
                    "name": "Korea",
                    "value": [523419776, 1, "韩国"]
                },
                {
                    "name": "United Kingdom",
                    "value": [558555575, 1, "英国"]
                },
                {
                    "name": "India",
                    "value": [1362985585, 1, "印度"]
                },
                {
                    "name": "China",
                    "value": [9002543651, 1, "中国"]
                },
                {
                    "name": "Canada",
                    "value": [593985885, 1, "加拿大"]
                },
                {
                    "name": "Iran",
                    "value": [513674806, 1, "伊朗"]
                }
            ]
        },
        {
            "time": 2000,
            "data": [{
                    "name": "United States",
                    "value": [5778104763, 1, "美国"]
                },
                {
                    "name": "Japan",
                    "value": [1228338322, 1, "日本"]
                },
                {
                    "name": "Germany",
                    "value": [905798518, 1, "德国"]
                },
                {
                    "name": "France",
                    "value": [412396989, 1, "法国"]
                },
                {
                    "name": "Italy",
                    "value": [464867130, 1, "意大利"]
                },
                {
                    "name": "United Kingdom",
                    "value": [563452733, 1, "英国"]
                },
                {
                    "name": "Russia",
                    "value": [1476213704, 1, "俄国"]
                },
                {
                    "name": "Canada",
                    "value": [538306176, 1, "加拿大"]
                },
                {
                    "name": "India",
                    "value": [925008177, 1, "印度"]
                },
                {
                    "name": "China",
                    "value": [3353992878, 1, "中国"]
                }
            ]
        },
        {
            "time": 1991,
            "data": [{
                    "name": "United States",
                    "value": [5081196927, 1, "美国"]
                },
                {
                    "name": "Japan",
                    "value": [1164795797, 1, "日本"]
                },
                {
                    "name": "Germany",
                    "value": [1030253303, 1, "德国"]
                },
                {
                    "name": "United Kingdom",
                    "value": [605042067, 1, "英国"]
                },
                {
                    "name": "Russia",
                    "value": [2373543864, 1, "俄罗斯"]
                },
                {
                    "name": "China",
                    "value": [2555693484, 1, "中国"]
                },
                {
                    "name": "Italy",
                    "value": [439285000, 1, "意大利"]
                },
                {
                    "name": "Canada",
                    "value": [453180544, 1, "加拿大"]
                },
                {
                    "name": "Ukraine",
                    "value": [630189707, 1, "乌克兰"]
                },
                {
                    "name": "India",
                    "value": [600250465, 1, "印度"]
                }
            ]
        },
        {
            "time": 1900,
            "data": [{
                    "name": "United States",
                    "value": [608093355, 1, "美国"]
                },
                {
                    "name": "Poland",
                    "value": [61467023, 1, "波兰"]
                },
                {
                    "name": "Czech",
                    "value": [33780786, 1, "捷克"]
                },
                {
                    "name": "Germany",
                    "value": [299390631, 1, "德国"]
                },
                {
                    "name": "France",
                    "value": [2565755, 1, "法国"]
                },
                {
                    "name": "United Kingdom",
                    "value": [408535073, 1, "英国"]
                },
                {
                    "name": "Belgium",
                    "value": [46682465, 1, "比利时"]
                },
                {
                    "name": "Austria",
                    "value": [24734402, 1, "奥地利"]
                },
                {
                    "name": "Russia",
                    "value": [39299799, 1, "俄国"]
                },
                {
                    "name": "Canada",
                    "value": [18417799, 1, "加拿大"]
                }
            ]
        }
    ]

    var option = {
        baseOption: {
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'quinticInOut',
            timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 5000,
                left: null,
                right: 5,
                top: 20,
                bottom: 20,
                width: 46,
                height: null,
                label: {
                    normal: {
                        textStyle: {
                            color: '#ddd'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                symbol: 'none',
                lineStyle: {
                    color: '#555'
                },
                checkpointStyle: {
                    color: '#bbb',
                    borderColor: '#777',
                    borderWidth: 1
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                data: data.map(function(ele) {
                    return ele.time
                })
            },
            // backgroundColor: '#404a59', // 背景颜色
            // title: {     
            //     text: '互动营销中心全球用户',// 大标题
            //     subtext: '单位:人',
            //     left: 'center',
            //     top: 'top',
            //     textStyle: {
            //         fontSize: 25,
            //         color: 'rgba(255,255,255, 0.9)'
            //     }
            // },
            tooltip: {
                formatter: function(params) {
                    if ('value' in params.data) {
                        return params.data.value[2] + ': ' + params.data.value[0];
                    }
                }
            },
            grid: {
                left: '12%',
                right: '45%',
                top: '70%',
                bottom: 20
            },
            xAxis: {},
            yAxis: {},
            series: [{
                id: 'map',
                type: 'map',
                mapType: 'world',
                top: '10%',
                bottom: '25%',
                left: 10,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        label: {
                            show: true
                        },
                        areaColor: 'rgba(255,255,255, 0.5)'
                    }
                },
                data: []
            }, {
                id: 'bar',
                type: 'bar',
                tooltip: {
                    show: false
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            color: '#ddd'
                        }
                    }
                },
                data: []
            }, {
                id: 'pie',
                type: 'pie',
                radius: ['8%', '20%'],
                center: ['75%', '85%'],
                roseType: 'radius',
                tooltip: {
                    formatter: '{b} {d}%'
                },
                data: [],
                label: {
                    normal: {
                        textStyle: {
                            color: '#ddd'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderSize: 1
                    }
                }
            }]
        },
        options: []
    }

    for (var i = 0; i < data.length; i++) {
        //计算其余国家GDP
        var restPercent = 100;
        var restValue = 0;
        option.options.push({
            visualMap: [{
                dimension: 0,
                left: 10,
                itemWidth: 12,
                min: data[i].data[9].value[0],
                max: data[i].data[0].value[0],
                text: ['High', 'Low'],
                textStyle: {
                    color: '#ddd'
                },
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered', 'red']
                }
            }],
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.1],
                axisLabel: {
                    show: false,
                }
            },
            yAxis: {
                type: 'category',
                axisLabel: {
                    textStyle: {
                        color: '#ddd'
                    }
                },
                data: data[i].data.map(function(ele) {
                    return ele.value[2]
                })
            },
            series: [{
                id: 'map',
                data: data[i].data
            }, {
                id: 'bar',
                data: data[i].data.map(function(ele) {
                    return ele.value[0]
                })
            }, {
                id: 'pie',
                data: data[i].data.map(function(ele) {
                    return {
                        name: ele.value[2],
                        value: ele.value
                    }
                })
            }]
        })
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function rightTopCharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart4'));

    var option = {
        // title: {
        //     text: '用电量'
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            y: 'bottom', // 垂直安放位置，默认为全图顶端，可选为：
            // 'top' ¦ 'bottom' ¦ 'center'
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ccc', // 图例边框颜色
            borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
            padding: 5, // 图例内边距，单位px，默认各方向内边距为5，
            // 接受数组分别设定上右下左边距，同css
            itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
            // 横向布局时为水平间隔，纵向布局时为纵向间隔
            itemWidth: 20, // 图例图形宽度
            itemHeight: 14, // 图例图形高度
            textStyle: {
                color: '#fff', // 图例文字颜色
                fontSize: 18, // 图例文字大小
            },
            data: ['煤炭', '天然气']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false, //坐标轴两边留白
            data: ['2007', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                //	margin:15,
                textStyle: {
                    color: '#1B253A',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                },
                formatter: function(params) {
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    var provideNumber = 4; //一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }

                    } else {
                        newParamsName = params;
                    }
                    return newParamsName
                },
                //rotate:50,
            },
            axisTick: { //坐标轴刻度相关设置。
                show: false,
            },
            // axisLine: {//坐标轴轴线相关设置
            //     // show: false,
            //     lineStyle: {
            //         color: '#213b63',
            //         // opacity:0.2
            //     }
            // },
            // splitLine: { //坐标轴在 grid 区域中的分隔线。
            //     show: false,
            //     lineStyle: {
            //         color: '#E5E9ED',
            //         // 	opacity:0.1
            //     }
            // }
        },
        yAxis: [{
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#E5E9ED',
                    // 	opacity:0.1
                }
            }

        }],
        series: [{
                name: '煤炭',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#3A84FF',
                        lineStyle: {
                            color: "#3A84FF",
                            width: 1
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(58,132,255,0)'
                            }, {
                                offset: 1,
                                color: 'rgba(58,132,255,0.35)'
                            }]),
                        }
                    }
                },
                data: [6395.6, 8074.6, 8164.9, 7861.1, 7460.4, 7727.3, 8075.2, 8064.9, 7688.1, 8067.2]
            },
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function rightBottomCharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart5'));
    var option = {
  color: colors,
  // backgroundColor: 'rgba(011, 023, 059)',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
      textStyle:{
          color: 'white'
      }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data: ['2017','2018','2019','2020','2021'],
        axisLabel:{
          color: 'white',
        },
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '碳交易市场规模(亿欧元)',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'White',
        }
      },
      axisLabel: {
        formatter: '{value} '
      },
    },
    {
      type: 'value',
      name: '增速',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: '增速',
      type: 'bar',
      data: [
        413,1444,1937,2879,7600,
      ],
    },
    {
      name: '碳交易市场规模',
      type: 'line',
      yAxisIndex: 1,
      data: [100,250,43,49,172]
    }
  ]
};
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}