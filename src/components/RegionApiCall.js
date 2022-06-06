import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchregions } from "../action";
import RegionData from "./Region";
import "./Region.css";

class RegionApiCall extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: [], errorInApi: false };
  }
  componentDidMount() {
    this.props.fetchregions();
  }
  secondDropdown(e) {
    const region = e.target.value;
    const filterCountryByRegion = this.props.regions.filter(
      (item) => item.region === region
    );
    const country = filterCountryByRegion.map((item) => item.name.common);
    this.setState({ countries: country });
  }

  errorHandler() {
    this.setState({
      errorInApi: this.props.error,
    });
  }

  handlecoutries(ev) {
    if (this.props.error) {
      this.errorHandler();
    } else {
      this.secondDropdown(ev);
    }
  }

  render() {
    const givenRegion = RegionData;
    return (
      <div id="allElement" role="main">
        <div id="selectRegion">
          <label htmlFor="region">Select Your Continent</label>
          <br />
          <select
            className="region"
            id="region"
            key="region"
            onChange={(e) => this.handlecoutries(e)}
          >
            {givenRegion.map((item, id) => (
              <option key={id}>{item}</option>
            ))}
          </select>
        </div>

        {this.state.countries.length > 0 && (
          <div id="countries">
            <label htmlFor="selectCountry">
              Select Your Country
              <select id="selectCountry" key={"output"}>
                {this.state.countries.map((ele, index) => (
                  <option key={index} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        
        { this.state.errorInApi && 
          window.alert(`${this.state.errorInApi} `)
        }
      </div>
    );
  }
}
const mapStateToProp = (state) => {
  return {
    regions: state.regions,
    error: state.error,
  };
};

export default connect(mapStateToProp, { fetchregions })(RegionApiCall);
