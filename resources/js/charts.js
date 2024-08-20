//Highest Qualification
var chartObj1 = Highcharts.chart('chart01', {
    chart: {
        type: 'pie', width:380,
        options3d: {enabled: true,alpha: 45,beta: 0},
        events: {
            load: function(){$('#chart01').highcharts().reflow();}
        }
    },
    title: {text: 'Highest Qualification',margin: -30},
    subtitle: {text: '',margin: -50},
    accessibility: {point: {valueSuffix: '%'}},
    tooltip: {pointFormat: 'Percentage: <b>{point.percentage}%</b>'},
    plotOptions: {
        pie: {
            cursor: 'pointer', depth: 35, dataLabels: {
                enabled: true, allowPointSelect: false, fontSize:'8px', distance: 10, padding: 5,
                format: '<b>{point.name}</b>: {point.percentage:.0f} %'
            }, showInLegend: true
        }
    },
    colors:['#3366cc','#dc3912','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00'],
    legend: {
      align:'left',
      itemStyle: {fontSize:'8px',color: '#333'},
      itemHoverStyle: {color: '#FFF'},
      itemHiddenStyle: {color: '#444'}
    },
    series: [{
        type: 'pie',
        data: [
            ['B.Com (All Majors)', 24],
            ['B.Tech & B.Engineering', 39],
            ['B.Sc. (All Majors) incl. B.As.', 12],
            ['B.A. (All Majors)', 9],
            ['Business Mgmt (Bachelors)', 7],
            ['Other Degrees', 6],
            ['B.C.A.', 2],
            ['B.Pharma', 1]
        ]
    }],
    exporting: {enabled: false},
    credits: {enabled: false}
});
chartObj1.reflow();

//Age
var chartObj2 = Highcharts.chart('chart02', {
    chart: {
        type: 'bar', width:380,
        events: {
            load: function () {$('#chart02').highcharts().reflow();}
        }
    },
    title: {text: 'Age'},
    xAxis: {
        categories: ['18-21', '22-25', '26-30', '31-35', '36-40', '40+'],
        title: {text: ''}
    },    
    yAxis: {min: 0,title: {text: ''}},
    legend: {enabled: false},
    plotOptions: {series: {stacking: 'normal',pointWidth: 20}},
    colors:['#3366cc'],
    series: [{
        data: [3, 23, 35, 19, 11, 10],
        dataLabels: {
            enabled: true,color: '#FFFFFF',align: 'right',format: '{point.y}',
            style: {fontSize: '10px',fontFamily: 'Verdana, sans-serif'}
        }
    }],
    tooltip: {pointFormat: 'Percentage: <b>{point.y}%</b>'},
    exporting: {enabled: false},
    credits: {enabled: false}
});
chartObj2.reflow();

//Industry
var chartObj3 = Highcharts.chart('chart03', {
    chart: {
        type: 'bar',width:380,
        events: {
            load: function () {$('#chart03').highcharts().reflow();}
        }
    },
    title: {text: 'Industry'},
    xAxis: {
        categories: ['Logistics/Shipping', 'Manufacturing', 'IT', 'Pharmaceuticals', 'FMCG', 'ITES/BPO/CRM Transcription','Engineering','E-Commerce','Defence/Government'],
        title: {text: 'Industry (In%)'}
    },    
    yAxis: {min: 0,title: {text: ''}},
    legend: {enabled: false},
    plotOptions: {series: {stacking: 'normal',pointWidth: 18}},
    tooltip: {pointFormat: 'Percentage: <b>{point.y}%</b>'},
    colors:['#3366cc'],
    series: [{
        data: [13, 9, 8, 5, 5, 4, 4, 3, 3],
        dataLabels: {
            enabled: true,color: '#FFFFFF',align: 'right',format: '{point.y}',
            style: {fontSize: '10px',fontFamily: 'Verdana, sans-serif'}
        }
    }],
    exporting: {enabled: false},
    credits: {enabled: false}
});
chartObj3.reflow();

//Designation
var chartObj4 = Highcharts.chart('chart04', {
    chart: {
        type: 'pie', width:380,
        options3d: {enabled: true,alpha: 45,beta: 0},
        events: {
            load: function(){$('#chart04').highcharts().reflow();}
        }
    },
    title: {text: 'Designation',margin: -30},
    subtitle: {text: '',margin: -50},
    accessibility: {point: {valueSuffix: '%'}},
    tooltip: {pointFormat: 'Percentage: <b>{point.percentage}%</b>'},
    plotOptions: {
        pie: {
            cursor: 'pointer', depth: 35, dataLabels: {
                enabled: true, allowPointSelect: false, fontSize:'8px', distance: 10, padding: 5,
                format: '<b>{point.name}</b>: {point.percentage:.0f} %'
            }, showInLegend: true
        }
    },
    colors:['#3366cc','#dc3912','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00'],
    legend: {
      align:'left',
      itemStyle: {fontSize:'8px',color: '#333'},
      itemHoverStyle: {color: '#FFF'},
      itemHiddenStyle: {color: '#444'}
    },
    series: [{
        type: 'pie',
        data: [
            ['Executive & Sr.Executive', 36],
            ['Manager', 34],
            ['Asst. Manager', 11],
            ['General Manager', 15],
            ['Managing Director/CEO', 3],
            ['Professional/Consultant', 1]            
        ]
    }],
    exporting: {enabled: false},
    credits: {enabled: false}
});
chartObj4.reflow();