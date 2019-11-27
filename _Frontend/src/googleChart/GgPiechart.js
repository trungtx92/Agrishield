import React, { Component, useRef } from 'react';
// import Chart from 'chart.js'
import Chart from 'react-google-charts';
class GgPiechart extends Component {
    constructor(props){
        super(props);
        // props.data = 
    }
    render(){
        return(
        <div style={{display:'flex', maxWidth: 1200}}>
            <Chart 
                width={"99%"}
                height={300}
                chartType="PieChart"
                data={this.props.data}
                options={{
                    // title: 'Pie Chart',
                    colors:[ '#c49806',"#71a510" ],
                    legend: {position:'top', alignment: 'center'}
                }}
                rootProps={{'data-testid':'1'}}
            />
        </div>
        );
    }
}
export default GgPiechart;

// const GgPieChart = props => {
//     const chartId = document.getElementById("chart")

//     const chart = new Chart(chartId, {
//         type: 'bar',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//             datasets: [{
//                 label: '# of Votes',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });
//     return (<div id="chart"></div>);
// }

// export default GgPieChart;
