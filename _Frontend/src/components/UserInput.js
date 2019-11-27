import React, {Component} from 'react';
import ContractTable from './ContractTable'
class UserInput extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.submitClick = this.submitClick.bind(this)
    }
    submitClick(){
        document.getElementById('popup-background').style.display='none';
        
    }
    render(){
        return(
            <div className="user-input">
                <center><h2>Farmer Registration</h2></center>
                <div className="user-input-form">
                    <div className="col-md-12">
                        <div className="md-form form-group">
                            <label for="inputAddressMD">Contact Name</label>
                            <input type="text" className="form-control" id="inputAddressMD" placeholder="Full Name"/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="md-form form-group">
                            <label for="inputAddressMD">Registered Address</label>
                            <input type="text" className="form-control" id="inputAddressMD" placeholder="e.g. Proserpine, Queensland"/>
                        </div>
                    </div>
                    <div className="col-md-12">
                    <div className="md-form form-group">
                        <label for="inputAddress2MD">Telephone</label>
                        <input type="text" className="form-control" id="inputAddress2MD" placeholder="--"/>
                        
                    </div>
                    </div>
                    <div className="col-md-12">
                        <div className="md-form form-group">
                            <label for="inputAddressMD">Email Address</label>
                            <input type="text" className="form-control" id="inputAddressMD" placeholder="@gmail.com"/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="md-form form-group">
                            <label for="inputAddressMD">Type of Insurance (single/’named’ or multi-peril crop, income protection, area yield coverageor weather such as hail, cyclone, flood, etc.)</label>
                            <input type="text" className="form-control" id="inputAddressMD" placeholder="e.g. weather based insurance"/>
                        </div>
                        </div>
                        <div className="col-md-12">
                            <div className="md-form form-group">
                                <label for="inputAddressMD">Insurance period</label>
                                <input type="text" className="form-control" id="inputAddressMD" placeholder="dd/mm/yyyy – dd/mm/yyyy"/>
                            </div>
                    </div>
                    <div className="col-md-12">
                        <div className="md-form form-group">
                            <label for="inputAddressMD">Broker Name</label>
                            <input type="text" className="form-control" id="inputAddressMD" placeholder="Full Name"/>
                        </div>
                        </div>
                        <div className="col-md-12">
                            <div className="md-form form-group">
                                <label for="inputAddressMD">Contact Detail</label>
                                <input type="text" className="form-control" id="inputAddressMD" placeholder="--"/>
                            </div>
                        </div>
                </div>
                <div className="col-md-12">
                <center><button id="btn-signUpFarmInfo" type="button" className="btn btn-primary btn-md col-md-6" onClick={this.props.farmerSubmit}>Submit</button></center>
                </div>
                <br/>
            </div>
        );
    }
}
export default UserInput;