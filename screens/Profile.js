import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FormLabel, FormInput, FormValidationMessage
} from 'react-native';
import { DataTable } from 'react-native-paper';


export default class Profile extends React.Component {

  render() {
    return (

      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 2</Text>
              </TouchableOpacity>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Dessert</DataTable.Title>
                  <DataTable.Title>Start date</DataTable.Title>
                  <DataTable.Title>Email</DataTable.Title>
                  <DataTable.Title numeric>Calories</DataTable.Title>
                  <DataTable.Title numeric>Fat</DataTable.Title>
                 
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Frozen </DataTable.Cell>
                  <DataTable.Cell>St date </DataTable.Cell>
                  <DataTable.Cell>Email@gmail.com </DataTable.Cell>
                  <DataTable.Cell numeric>159</DataTable.Cell>
                  <DataTable.Cell numeric>6.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                  <DataTable.Cell>date </DataTable.Cell>
                  <DataTable.Cell>Email</DataTable.Cell>
                  <DataTable.Cell numeric>237</DataTable.Cell>
                  <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>
                
                <DataTable.Row>
                  <DataTable.Cell>Frozen </DataTable.Cell>
                  <DataTable.Cell>St date </DataTable.Cell>
                  <DataTable.Cell>Email@gmail.com </DataTable.Cell>
                  <DataTable.Cell numeric>159</DataTable.Cell>
                  <DataTable.Cell numeric>6.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                  <DataTable.Cell>date </DataTable.Cell>
                  <DataTable.Cell>Email</DataTable.Cell>
                  <DataTable.Cell numeric>237</DataTable.Cell>
                  <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                  page={1}
                  numberOfPages={3}
                  onPageChange={(page) => { console.log(page); }}
                  label="1-2 of 6"
                />
              </DataTable>

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});