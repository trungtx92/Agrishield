import React, {Component} from 'react';
import Chart from 'react-google-charts';

class ContractTable extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div style={{display:'flex', maxWidth: '100%'}}>
            <table className="table table-bordered insurance-packages">
                <thead className="insurance-packages">
                    <tr>
                        <th>Provider</th>
                        <th>Product Name</th>
                        <th>Product Type</th>
                        <th>Length of Insurance</th>
                        <th>Fee</th>
                        <th>Terms and Condition</th>
                        <th>Excess Limit</th>
                        <th>Contact Details</th>
                    </tr>
                </thead>
                <tbody className="insurance-packages">
                    <tr>
                        <td>Insurance Facilitator</td>
                        <td>Insurance Facilitators, Cropsure</td>
                        <td>MPCI</td>
                        <td>12 months</td>
                        <td>$20/ha</td>
                        <td>Queensland</td>
                        <td>--</td>
                        <td>(08) 8372 4020 proposals@if.net.au</td>
                    </tr>
                    <tr>
                        <td>CGU/WFI</td>
                        <td>CGU/WFI, Crop Income Protection</td>
                        <td>MPCI</td>
                        <td>12 months</td>
                        <td>$18.5/ha</td>
                        <td>Queensland</td>
                        <td>--</td>
                        <td>(08) 8372 4020 proposals@if.net.au</td>
                    </tr>
                    <tr>
                        <td>Latevo</td>
                        <td>Latevo, Certainty</td>
                        <td>MPCI</td>
                        <td>12 months</td>
                        <td>$19/ha</td>
                        <td>Queensland</td>
                        <td>--</td>
                        <td>(08) 8372 4020 proposals@if.net.au</td>
                    </tr>
                </tbody>
            </table>
        </div>
        );
    }
}
export default ContractTable;