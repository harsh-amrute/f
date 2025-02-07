export const chartParams1 = {
    title:'Top 10 Products with Excess Inventory: Number Of Locations',
    chartType:'column',
    palette:{
        fills: ['#848484'],
        strokes: ['#ffffff', '#ffffff'],
    },
    chartKey:{
        Xaxis:['SKUDescription'],
        Yaxis:['WHCount']
    },
    series:[
        {
            type:'bar',
            xKey:'SKUDescription',
            yKey:'WHCount',
            yName:'Count of Locations',
            stacked:false,
            barPadding:0.2,
        }
    ],
    defaultColForChart:{
        columns:['SKUDescription','WHCount'],
        start:0,
        end:9
    },
    graphInfo:[
        'This graph highlights the top 10 products with surplus inventory, in maximum number of locations',
    ]
}


export const chartParams2 = {
    title:'Top 10 Products with Excess Inventory: In Value (Rupee Lakhs)',
    chartType:'column',
    palette:{
        fills: ['#848484'],
        strokes: ['#ffffff', '#ffffff'],
    },
    chartKey:{
        Xaxis:['SKUDescription'],
        Yaxis:['SumAmount']
    },
    series:[
        {
            type:'bar',
            xKey:'SKUDescription',
            yKey:'SumAmount',
            yName:'Value In Lakhs',
            stacked:false,
            barPadding:0.2,
        }
    ],
    defaultColForChart:{
        columns:['SKUDescription','SumAmount'],
        start:0,
        end:9
    },
    graphInfo:[
        'This graph highlights the top 10 products with the highest excess inventory, assessed in terms of monetary value.'
    ]
}