import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text, View, FlatList,
  TextInput, ActivityIndicator, Alert, SafeAreaView, Image, ImageBackground, AsyncStorage, TouchableWithoutFeedback, TouchableHighlight} from "react-native";
import { Container, Content, Header, Card, CardItem, Thumbnail,Title, Toolbar, Icon, ListItem, List,Item, Input, Button, Body,Left, Right } from 'native-base';
import leavesBG from '../Images/bg.jpg';
import file from '../convertcsv.json';
import ResultCard from './ResultScreen.js';

export default class History extends Component {

    constructor(props) {
        super(props);
         // Getting values from the Async Storage
        //setting default state
        this.state = {
            isLoading: true,
            text: '' ,
            listOfhist : []
        };
        this.getHistory();
    } 

    // Function to load the data from AsyncStorage intitally
    getHistory = async () => {
    
      try {
        const hist = await AsyncStorage.getItem('history')
        if(value !== null) {
          this.setState({  listOfhist : JSON.parse(hist)});
        }
        console.log("entered get history" + listOfhist)
      } catch(e) {
        // error reading value
      }
      
    }

    // Function to refresh the History list to get latest values
    refresh = async () => {
      try {
        const hist = await AsyncStorage.getItem('history')
        if(hist !== null) {
          this.setState({  listOfhist : JSON.parse(hist)});
        }
      } catch(e) {
        // error reading value
      }
    }
        
    async componentDidMount() {
        // this._updateList();
        AsyncStorage.getItem('history')
        .then(
             (value) =>{
              this.setState({  listOfhist : JSON.parse(value) , isLoading: false});
              console.log(value)
             } 
         )
    }
    goToResultScreen = (text) => {
        // return navigate('Detail');
        const { navigate } = this.props.navigation;
        navigate('ResultCard', { search : text });
        //console.log("clickable" + text)
    }

    ListViewItemSeparator = () => {
      //Item sparator view
      return (
          <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
    };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (

      
      <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={leavesBG}
            style={styles.background}>
              <Content>
                <View style={{paddingLeft:10, paddingRight:10, paddingTop:20}}>
                <View style={{paddingLeft:10, paddingRight:20, flexDirection:'row',backgroundColor:'#000'}}>
                
              <View style={{width:"70%",}}>
              <Text style={{ fontSize: 22, color: 'white', fontWeight:'bold', paddingHorizontal:20, paddingVertical:10, paddingTop:20
              , paddingBottom:20,  height:70,backgroundColor:'#000'}}>
                History
              </Text>
              </View>
              <View style={{width:"30%",}} >
                                  <TouchableOpacity
                                      onPress={() => this.refresh() }
                                      style={{paddingLeft:"70%", alignContent:'center', paddingTop:"15%", paddingBottom:"3%"}}
                                      >
                                      <Icon name="ios-refresh" size={60} style={{color:'white'}} />
                                  </TouchableOpacity>
              </View>
              </View>
              </View>
                
                <View style={styles.row_zero}>
                <List style={{paddingTop:20,paddingBottom:30, width:"80%"}}>
                        <FlatList
                            data={this.state.listOfhist}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            renderItem={({ item }) => {
                               return(
                                <ListItem>
                                  <TouchableHighlight onPress={() => navigate('ResultCard', { search : item })} >
                                  <Thumbnail square size={"40%"} source={{uri : file[item][0].Images}} />
                                  </TouchableHighlight> 
                                  <View style={{width:"80%"}}>
                                  <TouchableHighlight onPress={() => navigate('ResultCard', { search : item })}> 
                                  <Text style={styles.FlatListItemStyle} >
                                      {item} 
                                  </Text>
                                  </TouchableHighlight>
                                  </View>
                                </ListItem>
              )
                            }}
                            enableEmptySections={true}
                            style={{ marginTop: 10 }}
                            keyExtractor={(item, index) => index}
                        />
                    </List>
                </View>
                </Content>
                
            </ImageBackground>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255, .5)"
  },
  top: {
    //flex: 1,
    height: '30%',
    //alignItems: 'center',
    justifyContent: 'center'
  },
  row_one: {
    flexDirection: "row",
    justifyContent: 'center',
    zIndex : 1,
  },
  row_zero: {
    flexDirection: "row",
    justifyContent: 'center',
    zIndex : 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  ImageIconStyle1: {
    height: 70,
    width: 60,
    borderWidth: 2,
    marginLeft: 15
  },
  ImageIconStyle2: {
    height: 70,
    width: 60,
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5

  },
  background: {
    width: '100%',
    height: '100%'
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  search: {
    height: 40,
    borderWidth: 2,
    width: '55%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00AA11',
  },
  text: {
    width: '60%'
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 21,
    height: 55,
    paddingLeft: 10,
    fontWeight:'bold'
  },
  viewStyle: {
      justifyContent: 'center',
      flex: 1,
      marginTop: 40,
      padding: 16,
  },
  textStyle: {
      padding: 10,
  },
  textInputStyle: {
      flex : 1,
      borderWidth: 1,
      paddingLeft: 10,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
  },
});