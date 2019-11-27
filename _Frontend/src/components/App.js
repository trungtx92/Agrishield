import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseApp} from '../firebase';
import GgBarchart from '../googleChart/GgBarchart';
import GgPiechart from '../googleChart/GgPiechart';
import MapContainer from './MapContainer';
import MapFullSugar from './MapFullSugar';
import InfoTable from './InfoTable';
import UserInput from './UserInput';
import ContractTable from './ContractTable';
import ApLineChart from '../apexCharts/ApLineChart';
import LineChart from '../apexCharts/Line Chart';
class App extends Component {

  constructor(){
    super();
    this.state = {
      fieldId:"",
      dataChart:[],
      fieldPolygon:[],
      dataMap: [],
      dataBarChart:[],
      dataLineChart:[],
      dataLine: [],
      dataPieChart:[],
      dataDoubleLineChart: [],
      dataRainfallOnlyChart:[],
      dataTempOnlyChart:[],
      dataRainfallChart:[],
      dataTempChart:[],
      dataNDVIChart:[],
      dataNDVIAverageChart:[],
      dataNDVIPredictChart:[],
      dataLocation:[["","","","","",""]],
      mapState: false,
      zoomValue: 10,
      cropMapCenter: {lat: -20.42908687, lng: 148.5692803},
      fullMapCenter: {lat: -20.42908687, lng: 148.5692803},
      chartStatus: false,
      tableInfoStatus: false,
      checkSubmitStatus: false
    };
    this.exploreClick = this.exploreClick.bind(this);
    this.loadFileAsText = this.loadFileAsText.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.farmerSubmit = this.farmerSubmit.bind(this);
  }
  farmerSubmit(){
    document.getElementById('popup-background').style.display='none';
    this.setState({checkSubmitStatus: true});
  }
  exploreClick(){
    var filename = this.state.fieldId;
    this.setState({dataBarChart:this.state.dataChart.yieldChart});
    this.setState({dataPieChart:this.state.dataChart.harvestChart});
    this.setState({chartStatus: true});
    this.setState({checkSubmitStatus: false})
    
    fetch("https://celtic-buttress-254207.appspot.com/api/map?fieldId=" + filename)
          .then(response => response.json())
          .then(json=>{this.setState({dataMap: json.data})})        
  }
  closePopup(){
    document.getElementById('popup-background').style.display='none';
  }
  submitClick(){
    document.getElementById('popup-background').style.display='block';
  }
  loadFileAsText(){
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var reader = new FileReader();
    const scope = this;
    this.setState({mapState: true})
    this.setState({zoomValue: 14})
    this.setState({chartStatus: false})
    reader.onload = ()=>{
      var fileFullName = fileToLoad.name;
      var filename = fileFullName.split(".");
      document.getElementById("path-file").innerHTML = filename[0];
      // document.getElementById('test').innerHTML = filename[0]
      scope.setState({fieldId: filename[0]})
      var filename = this.state.fieldId;
      var url = "https://celtic-buttress-254207.appspot.com/api/chart?fieldId=" + filename
      fetch(url)
            .then(response => response.json())
            .then(json => {
              var rainfallArr = []
              var tempArr = []
              var ndviArr = []
              // var ndviAverageArr = []
              var ndviPredictArr = []
              json.data.rainfallOnlyChart.forEach(element => {
                var date = element.x.split("/")
                var tg = date[0]
                date[0] = date[1]
                date[1] = tg
                var str = date[0] + "/" + date[1] + "/" + date[2]
                rainfallArr.push({x:new Date(str), y:element.y})
              });
              json.data.tempOnlyChart.forEach(element => {
                var date = element.x.split("/")
                var tg = date[0]
                date[0] = date[1]
                date[1] = tg
                var str = date[0] + "/" + date[1] + "/" + date[2]
                tempArr.push({x: new Date(str), y:element.y});
              });
              json.data.ndviChart.forEach(element =>{
                
                var date = element[0].split("/")
                var tg = date[0]
                date[0] = date[1]
                date[1] = tg
                var str = date[0] + "/" + date[1] + "/" + date[2]
                if(new Date(str) <= new Date("09/26/2019")){
                  ndviArr.push({x:new Date(str), y:element[1]})
                } else {
                  ndviPredictArr.push({x:new Date(str), y:element[1]})
                }
                
              })
              this.setState({dataChart: json.data});
              this.setState({dataLocation: json.data.location_info});
              this.setState({dataRainfallOnlyChart: rainfallArr})
              this.setState({dataTempOnlyChart: tempArr})
              this.setState({dataNDVIChart: ndviArr})
              this.setState({dataNDVIPredictChart: ndviPredictArr})
              this.setState({tableInfoStatus: true})
            })
            .then(()=>{document.getElementById("btn-explore").disabled = false})
      var data = JSON.parse(reader.result);
      var coordinates = data.features[0].geometry.coordinates[0];
      var outerCoords = [];
      for(var i = 0; i < coordinates.length; i++){
        outerCoords.push({lat: coordinates[i][1], lng: coordinates[i][0]});
      }
      scope.setState({fullMapCenter: {lat: coordinates[0][1], lng: coordinates[0][0]}})
      console.log({lat: coordinates[0][1], lng: coordinates[0][0]})
      scope.setState({fieldPolygon: outerCoords})
    }
    reader.readAsText(fileToLoad, "UTF-8");
  }
  componentDidMount(){
    document.getElementById("btn-explore").disabled = true;
  }
  signOut(){
    firebaseApp.auth().signOut();
  }

  render(){
    var firstRow = <div></div>;
    var secondRow = <div></div>;
    var thirdRow = <div></div>;
    var btnSubmit = <div></div>;
    var tbFarmerContract = <div></div>;
    var tbInfor = <div></div>
    if(this.state.tableInfoStatus == false){
      tbInfor = <div></div>
    } else {
      tbInfor = <InfoTable data={this.state.dataLocation}/>
    }
    if(this.state.chartStatus == false){
      firstRow = <div></div>;
      secondRow = <div></div>;
      thirdRow = <div></div>;
      btnSubmit = <div></div>;
    } else {
      firstRow = 
      <div className="row">
      <div className="col-xl-4 col-lg-5">
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Current Crop Growth</h6>
          </div>
          <div className="map-container chart-area">
            <MapContainer data={this.state.dataMap}/>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Current Harvest Progress: 26/09/2019</h6>
          </div>
          <div className="pie-chart chart-area">
            <GgPiechart data={this.state.dataPieChart}/>  
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="card">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Regional Historical Yield (tonnes/ha)</h6>
        </div>
        <div className="pie-chart bar-chart">
          <GgBarchart data={this.state.dataBarChart}/>
        </div>
        </div>
      </div>
      </div>
      secondRow = 
      <div className="row">
      <div className="col-xl-8">
        <div className="card">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Historical and Projected NDVI</h6>
          </div>
          <div className="line-chart ">
            <LineChart dataNDVI={this.state.dataNDVIChart} dataNDVIPredict={this.state.dataNDVIPredictChart}/>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Projected Growth Next Season </h6>
            </div>
            <div className="table-growth">
              <table >
                <tr className="table-cell">
                  <th>Start Date:</th>
                  <td>&emsp;&emsp;28/10/2019</td>
                </tr>
                <tr className="table-cell">
                  <th>Germination:</th>
                  <td>&emsp;&emsp;34 days</td>
                </tr>
                <tr className="table-cell"> 
                  <th>Tiltering:</th>
                  <td>&emsp;&emsp;98 days</td>
                </tr>
                <tr className="table-cell">
                  <th>Grand Growth Phase:</th>
                  <td>&emsp;&emsp;98 days</td>
                </tr>
                <tr className="table-cell">
                  <th>End Date:</th>
                  <td>&emsp;&emsp;18/10/2020</td>
                </tr>
            </table>
          </div>
        </div>
      </div>
      </div>
      thirdRow = 
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Historical Temperature and Rainfall</h6>
            </div>
            <div className="pie-chart double-line-chart">
              <ApLineChart dataRainfall={this.state.dataRainfallOnlyChart} dataTemp={this.state.dataTempOnlyChart} />
            </div>
          </div>
          </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Severe Weather Events</h6>
            </div>
          <div className="table-event">
            <table >
              <tr className="table-cell">
                <th>Event:</th>
                <td>&emsp;&emsp;Flood</td>
              </tr>
              <tr className="table-cell">
                <th>Start Date:</th>
                <td>&emsp;&emsp;14/02/2008</td>
              </tr>
              <tr className="table-cell">
                <th>Region:</th>
                <td>&emsp;&emsp;Mackay-Queensland</td>
              </tr>
              <tr className="table-cell">
                <th>Description:</th>
              </tr>
            </table>
            Heavy rainfall and subsequent flooding resulted in widespread damage across the state of Queensland. The Insurance Council of Australia estimated the 2008 damage at $410 million, with the 2011 estimated normalised cost of $507 million. 
          </div>
        </div>
        </div>
      </div>
      btnSubmit = 
      <div className="submit-form col-xl-12">
        <center><button id="btn-submitFarmInfo" className="btn-color" type="button" onClick={this.submitClick}>Submit Information</button></center>
        <center>Submit your farm information to insurance portal. This will require to input grower details and take few days to update data from insurance providers.</center>
        <br/>
      </div>
    }
    if(this.state.chartStatus == false){
      tbFarmerContract = <div></div>;
      btnSubmit = <div></div>;
    } else {
      if(this.state.checkSubmitStatus == false){
        tbFarmerContract = <div></div>;
        btnSubmit = 
        <div className="submit-form col-xl-12">
          <center><button id="btn-submitFarmInfo" className="btn-color" type="button" onClick={this.submitClick}>Submit Information</button></center>
          <center>Submit your farm information to insurance portal. This will require to input grower details and take few days to update data from insurance providers.</center>
          <br/>
        </div>
      } else {
        btnSubmit = 
        <div className="insurance-packages">
          <h2>Insurance Packages</h2>
          <p>Below is example of requested insurance products. The packages’ information will be updated once receiving from insurance provider</p>
        
         <div><ContractTable/></div>
        </div>
      }
    }
    
    return (
      <div id="page-top">
        <div id="wrapper">
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
              </div>
              <div className="sidebar-brand-text mx-3" onClick={this.signOut}>Tony Pham</div>
            </a>
            <hr className="sidebar-divider my-0"/>
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>My Dashboard</span>
              </a>
            </li>
            <hr className="sidebar-divider"/>
            <div className="sidebar-heading">
              Lead board
            </div>

            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-search"></i>
                <span>Find lead</span>
              </a>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Custom Components:</h6>
                  <a className="collapse-item" href="buttons.html">Buttons</a>
                  <a className="collapse-item" href="cards.html">Cards</a>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <i className="fas fa-fw fa-cog"></i>
                <span>My Lead</span>
              </a>
              <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Custom Utilities:</h6>
                  <a className="collapse-item" href="utilities-color.html">Colors</a>
                  <a className="collapse-item" href="utilities-border.html">Borders</a>
                  <a className="collapse-item" href="utilities-animation.html">Animations</a>
                  <a className="collapse-item" href="utilities-other.html">Other</a>
                </div>
              </div>
            </li>

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
              Add Services
            </div>

            <li className="nav-item">
              <a className="nav-link" href="charts.html">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Soil analysis</span></a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="tables.html">
                <i className="fas fa-fw fa-table"></i>
                <span>Land Resources</span></a>
            </li>

            <hr className="sidebar-divider d-none d-md-block"/>
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">

              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars"></i>
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="d-sm-flex align-items-center justify-content-between">
                  <h2 className="h3 mb-1 text-gray-800">Dashboard</h2>
                </div>
                </form>

                <ul className="navbar-nav ml-auto">

                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-search fa-fw"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                          <div className="input-group-append">
                            <button class="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                </ul>
              </nav>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-9 col-lg-7">
                    <div className="card">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 id="path-file" className="m-0 font-weight-bold text-primary">Find My Farm</h6>
                          <div className="image-upload">
                            <label for="fileToLoad">
                              <img src="resources/images/upload icon.png"/>
                            </label>
                            <input id="fileToLoad" type="file" onChange={this.loadFileAsText} name="myFile"/>
                          </div></div>
                      <div className="card-body gg-map-session">
                          
                        <div className="chart-area">
                            <MapFullSugar center={this.state.fullMapCenter} zoom={this.state.zoomValue} dataField={this.state.fieldPolygon}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-5">
                    <div className="card">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Farm Information</h6>
                      </div>
                      <div className="infortable-session">
                          {tbInfor}
                            
                      </div>
                      <div className="form-group sm-btn">
                          <button id="btn-explore" className="btn-color" type="button" onClick={this.exploreClick}>Explore</button>
                        </div>
                    </div>
                  </div>
                </div>
                <br/>
                {firstRow}
                <br/>
                {secondRow}
                <br/>
                {thirdRow}
                <br/>
                {btnSubmit}
                
                <div id="popup-background" className="">
                    <div id='popup' className="col-md-4">
                      <button id='btClose' className="btn" onClick={this.closePopup}><i className="fa fa-close"></i></button><br/>
                      <UserInput farmerSubmit={this.farmerSubmit}/>
                    </div>
                </div>

                <div id="contract-table">
                  {tbFarmerContract}
                </div>
            </div>
            
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; AgriShield 2019</span>
                </div>
              </div>
            </footer>
          </div>

          </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state){
  console.log('state', state);
  return {};
}

export default connect(mapStateToProps, null) (App);
