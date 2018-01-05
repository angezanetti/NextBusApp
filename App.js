import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

export default class NextBus extends Component {
  componentDidMount() {
    return fetch('http://restbus.info/api/agencies/sf-muni/routes/24/stops/4326/predictions')
      .then((response) => response.json())
      .then((responseJson) => {
		let nextBus = responseJson[0].values[0].minutes;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
	  <Text>Hello world! {this.nextBus}</Text>
    );
  }
}
