import React, {Component} from 'react';
import Chart from 'react-google-charts';
class GgLinechart extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <div style={{display:'flex', maxWidth: 900}}>
            <Chart
                width="100%"
                height={300}
                chartType="LineChart"
                // data={[
                //     [{type:'date', label:'Day'}, 'NDVI', 'Average'],
                // data={[
                //     ['x', 'NDVI', 'Average'],
                //     ['1/12/16', 0.091, 0.45],
                //     ['9/12/16', 0.143, 0.45],
                //     ['19/12/16', 0.5, 0.45],
                //     ['28/12/16', 0.333, 0.45],
                //     ['6/1/17', 0.250, 0.45],
                //     ['28/12/16', 0.125, 0.45],
                //     ['28/12/16', 1, 0.45],
                //     ['28/12/16', 0.3, 0.45],
                // ]}
                data={this.props.data}
                options={{
                    intervals:{
                        style:'points'
                    },
                    colors:["black", "#009b27"],
                    legend:{position:'top', alignment:'center'},
                }}
                rootProps={{'data-testid':'2'}}
            />
        </div>
        );
    }
}
export default GgLinechart;