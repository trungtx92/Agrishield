import React, {Component} from 'react';
import Chart from 'react-google-charts';

class GgBarchart extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{display:'flex', maxWidth: 900}}>
                <Chart
                    width={'99%'}
                    height={300}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data = {this.props.data}
                    options={{
                        chartArea: {width:'70%'},
                        colors:["#074b5b"],
                        legend: 'none',
                        hAxis:{
                            title: 'Years',
                            minValue: 0,
                        },
                        vAxis:{
                            minValue:0,
                            // title: "tonnes/ha",
                        },
                    }}
                    legendToggle
                />
            </div>
        );
    }
}

export default GgBarchart;