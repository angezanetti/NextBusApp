import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class NextBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextBus: 'n/a'
    }
  }
  componentDidMount() {
    return fetch('http://restbus.info/api/agencies/sf-muni/routes/24/stops/4326/predictions')
      .then((response) => response.json())
      .then((responseJson) => {
		this.setState({
		  nextBus: responseJson[0].values[0].minutes,
		  next2Bus: responseJson[0].values[1].minutes
		}, function() {
		});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
	if (this.state.nextBus) {
	  return (
		<View style={{flex: 1, paddingTop: 20}}>
		<Text style={styles.bigblue}>Next bus 24: {this.state.nextBus}</Text>
		<Text style={styles.bigblue}>The one after: {this.state.next2Bus}</Text>
		</View>
	  );
	}
  }
}
const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
