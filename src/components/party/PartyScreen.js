import React, { Component } from "react";
//import ApiMock from "../../api/ApiMock";
import PartySummary from "./PartySummary";
import Party from "./Party";
import { Layout, List } from "antd";
import "../../css/app-body.css";
import "../../css/app-party.css";
import axios from "axios";

class PartyScreen extends Component {
  state = { focusParty: false, party: {}, foundParties: {} };

  componentDidMount() {
    var self = this;
    axios
      .get("https://farrapp-api.herokuapp.com/parties")
      .then(function(response) {
        self.setState({ foundParties: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleFocusParty = prty => {
    this.setState({ focusParty: true, party: prty, parties: null });
  };

  renderSummary = partyList => {
    return Object.values(partyList).map(prt => {
      return (
        <PartySummary
          key={prt.partyName}
          party={prt}
          focusHandler={this.handleFocusParty}
        />
      );
    });
  };

  renderParty = () => {
    return <Party party={this.state.party} />;
  };

  render() {
    if (this.state.focusParty) {
      return <Layout className="container-party">{this.renderParty()}</Layout>;
    } else {
      return (
        <Layout className="container-summary">
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
            dataSource={
              this.props.option === "1"
                ? this.renderSummary(this.state.foundParties)
                : this.renderSummary(
                    JSON.parse(localStorage.getItem("profileInfo")).myParties
                  )
            }
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Layout>
      );
    }
  }
}

export default PartyScreen;
