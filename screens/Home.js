import React, { Component } from 'react';
import { Alert, Modal, Button, StyleSheet, AsyncStorage, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      isVisible: false,
      isVisible1: false,
      mobileNumber: ""
    };
  }

  // _appointmentHandler = async () => {
  //   this.setState({
  //     mobileNumber: await AsyncStorage.getItem('mobileNumber'),
  //     token: await AsyncStorage.getItem('token')
  //   });

  //   console.log("Session mobileNumber ::", AsyncStorage.getItem('mobile'))
  //   // fetch(`https://schedulemeetings.herokuapp.com/ui/userAppointments/`)
  //   //   .then(response => response.json())
  //   //   .then(data =>
  //   //     console.log('Data:', data)
  //   //   )
  //   //   .catch(error => {
  //   //     console.log("Error::", error)
  //   //   });
  // };

  // componentDidMount() {
  //   this._appointmentHandler();
  // }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <Agenda
          //items={this.items.bind(this)}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2020-01-01'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />

        {/*Action button component !*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' textStyle={{ color: '#9b59b6' }} title="Create Appointment" onPress={() => { this.setState({ isVisible: true }) }}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' textStyle={{ color: '#1abc9c' }} title="Share Calender" onPress={() => { this.setState({ isVisible1: true }) }}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

        {/* Creat appointmnet model window */}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}>
          {/*All views of Modal*/}
          <View style={styles.modal}>
            <Text style={styles.text}>Creat Appointment Modal is open!</Text>
            <Button title="Click To Close Modal" onPress={() => {
              this.setState({ isVisible: !this.state.isVisible })
            }} />
          </View>
        </Modal>
        {/* Share Calender model window */}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisible1}
          onRequestClose={() => { }}>
          {/*All views of Modal*/}
          <View style={styles.modal}>
            <Text style={styles.text}>Share Calender model is open!</Text>
            <Button title="Click To Close Modal" onPress={() => {
              this.setState({ isVisible1: !this.state.isVisible1 })
            }} />
          </View>
        </Modal>
      </View>
    );

  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#9b59b6",
    height: 300,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,

  },
  text: {
    color: '#3f2949',

  }
});
