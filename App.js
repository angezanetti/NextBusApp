import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class NextBus extends Component {
  constructor(props) {
    super(props);
	// Setup default value for nextBus
    this.state = {
      nextBus: 'n/a',
	  firstTime: 1
    }
  }
  componentDidMount() {
	if (this.state.firstTime == 1) {
	  this.timer = setInterval(()=> this.getBusData(), 1000)
	  this.state.firstTime = 0;
	} else {
	  // Fetch the API evey 30 secs
	  this.timer = setInterval(()=> this.getBusData(), 30000)
	}
  }

  async getBusData() {
	try {
	  let response = await fetch(
		'http://restbus.info/api/agencies/sf-muni/routes/24/stops/4326/predictions'
	  );
	  let responseJson = await response.json();
	  //Set the values of the 2 next bus time
	  this.setState({
		nextBus: responseJson[0].values[0].minutes,
		next2Bus: responseJson[0].values[1].minutes
	  });
	  return this.setState;
	} catch (error) {
	  console.error(error);
	}
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
