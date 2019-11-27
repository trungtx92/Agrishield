import React, {Component} from 'react';
import Chart from 'react-google-charts';

class GgDoubleLineChart extends Component {
    constructor(props){
        super(props);
    }
    render(){
        // console.log(this.props.data);
        return(
            
            <Chart
                width={'95%'}
                height={250}
                chartType="Line"
                // data={[
                //     [{type:'date', label:'Day'}, 'Temp', 'Rainfal'],
                //     [new Date(2018, 1), 23.1, 299],
                //     [new Date(2018, 2), 30.17, 187],
                //     [new Date(2018, 3), 23.00, 280],
                //     [new Date(2018, 4), 30.00, 100],
                //     [new Date(2018, 5), 22.2, 276],
                //     [new Date(2018, 6), 23.11, 239],
                //     [new Date(2018, 7), 29.25, 233],
                //     [new Date(2018, 8), 30.00, 370],
                //     [new Date(2018, 9), 29.11, 43],
                //     [new Date(2018, 10), 21.11, 145],
                //     [new Date(2018, 11), 29.5, 381],
                //     [new Date(2018, 12), 30.1, 141],
                // ]}
                data={this.props.data}
                options={{
                    // chartArea: {width:'100%', height:'100%'},
                    chart:{
                        
                    },
                    colors:["#cc0000", "#1d9acb"],
                    // width: {'10%'},
                    // height: '300px', 
                    series: {
                        0: {axis: 'Temps'},
                        1: {axis: 'Rainfall'},
                    },
                    axes: {
                        x:{
                            minValue:0
                        },
                        y:{
                            Temps:{label: 'Temps (Celsius)'},
                            Rainfall: {label: 'Rainfall(mm)'},
                            minValue:0
                        }
                    },
                    lineWidth:0,
                    // legend: 'none'
                    legend: {position:'top', alignment: 'center'}
                }}
                // legendToggle
            />
        );
    }
}
export default GgDoubleLineChart;