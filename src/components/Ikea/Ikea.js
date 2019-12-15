import React, { Component } from "react";
import PropTypes from "prop-types";
import IkeaSingle from "./IkeaSingle";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Blankpage from "./Blankpage";
import Error from "./Error";

export default class Ikea extends Component {
  state = {
    news: [],
    error: false,
    blank: true
  };

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.handleCheck();
    }
  }

  handleCheck = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.props.item !== "" ? this.apiCall() : this.setState({ blank: true });
    }, 200);
  };

  apiCall = () => {
    this.setState({ error: false, blank: false });
    const url = this.props.url;
    axios
      .post(url, {
        requests: [
          {
            indexName: this.props.indexName,
            params: `query=${this.props.item}&hitsPerPage=${this.props.hitsPerPage}`
          }
        ]
      })
      .then(response => {
        this.setState({
          news: response.data.results[0].hits
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  };

  renderItems() {
    if (!this.state.error && !this.state.blank) {
      return this.state.news.map(item => (
        <Box p={1} key={item.ikea_id}>
          <IkeaSingle key={item.ikea_id} item={item} />
        </Box>
      ));
    } else if (this.state.blank) {
      return <Blankpage />;
    } else {
      return <Error />;
    }
  }

  render() {
    return (
      <>
        <div style={{ width: "100%" }}>
          <Box
            display="flex"
            flexWrap="wrap"
            alignContent="flex-start"
            p={1}
            m={1}
          >
            {this.renderItems()}
          </Box>
        </div>
      </>
    );
  }
}

Ikea.propTypes = {
  item: PropTypes.string,
  url :PropTypes.string,
  indexName : PropTypes.string,
  hitsPerPage: PropTypes.string,
};

Ikea.defaultProps = {
  item: "",
  url :"https://latency-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=6be0576ff61c053d5f9a3225e2a90f76&x-algolia-application-id=latency",
  indexName :"ikea",
  hitsPerPage: "16",
};
