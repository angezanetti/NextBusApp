import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
	// Setup default value for nextBus
    this.state = {
      nextBus: 'n/a',
	  firstTime: 1
    }
  }
  componentDidMount() {
	if (this.state.firstTime === 1) {
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
		next2Bus: responseJson[0].values[1].minutes,
		route: responseJson[0].route.id,
		direction: responseJson[0].values[0].direction.title,
		stop: responseJson[0].stop.title,
	  });
	  return this.setState;
	} catch (error) {
	  // If we can't parse the data then we set them to n/a
        this.setState({
            nextBus: 'n/a',
            next2Bus: 'n/a',
            route: 'n/a',
            direction: 'n/a',
            stop: 'n/a',
        });
        return this.setState;
	}
  }
  static navigationOptions = {
      title: 'Welcome',
  };
  render() {
	if (this.state.nextBus) {
        const { navigate } = this.props.navigation;
        return (
		<View style={styles.container}>
          <Button onPress={() => navigate('Settings')} title="Settings" />
		  <Text style={styles.routeInfo}>{this.state.route} {this.state.direction} →</Text>
		  <Text style={styles.routeInfo}>{this.state.stop}</Text>

		  <View style={styles.outerCircle}>
			<Text style={styles.innerText}>{this.state.nextBus} min</Text>
		  </View>

		  <Text style={styles.busAfter}>The bus after: {this.state.next2Bus} min</Text>
		</View>
	  );
	}
  }
}

class SettingsScreen extends Component {
    static navigationOptions = {
        title: "Let's change the bus stops!",
    };
    render() {
        return (
            <View>
                <Text>Chat with Lucy</Text>
            </View>
        );
    }
}

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen }
});

export default class App extends Component {
    render() {
        return <SimpleApp />;
    }
}

const styles = StyleSheet.create({
  routeInfo: {
    color: '#E9D95A',
    fontWeight: 'bold',
    fontSize: 15,
	marginBottom: 10
  },
  busAfter: {
    color: '#E9D95A',
    fontWeight: 'bold',
    fontSize: 25,
	marginTop: 20
  },
  outerCircle: {
	width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E9D95A',
  },
  innerText: {
	marginTop: 30,
	marginLeft: 50,
	width: 100,
	fontSize: 60,
    color: '#21717C',
	textAlign: 'center'
  },
  container: {
	flex: 1,
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#21717C'
    }
});
