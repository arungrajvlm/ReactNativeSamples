import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text
} from 'react-native';
import  AppRoot from './app_src/screens/home';
const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor="#AD353D" />
      <SafeAreaView>
            <AppRoot/>
      </SafeAreaView>
    </Fragment>
  );
};
export default App;

//home 
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
const ImagePickerOptions = {
    title: 'Please Select an Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
    

export default class HomeUpload extends Component {
      fileChooserClicked = () => {
        console.log('File Chooser Clicked');
        ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
            console.log('Image Picker Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.state.avatarSource =  { uri: response.uri };
                this.setState({
                    avatarSource : { uri: response.uri }
                })
                console.log("State :"+this.state.avatarSource.uri);
                }
        });
      }
      


    onSubmitUpload = () => {
        var photo = {
            uri: this.state.avatarSource.uri,
            type: 'image/jpeg',
            name: 'appImage.jpg',
        };
        console.log("Image Fetched from device successfully");

        var formToSend = new FormData(); 
        formToSend.append('file', photo);
        var uploadURL = "URL";
        fetch(uploadURL, {
            method: 'POST',
            body:formToSend
        })
            .then((response)=>response.json())
                .then((responseJson)=>{
                    if(responseJson.success === 1){
                        alert('Uploaded Success! Message :'+responseJson.message);
                    }else{
                        alert(JSON.stringify(responseJson));
                        alert(responseJson.message);
                    }
                    this.setState({
                        isLoading:false,
                        dataSource:responseJson,
                    })
                })
                    .catch((error)=>{
                        alert("API Call failed"+error);
                    });
    }
      
      //state object
    state = {
        avatarSource:{
        uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'           
        } 
    };

    render() {
        return (
            <ScrollView backgroundColor="#AD353D">
                <View>
                    <Text> Upload Screen</Text>
                </View>
                <View>
                    <TouchableOpacity   onPress={this.fileChooserClicked}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={require('./images/upload_icon.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Image
                        style={{width: 250, height: 250}}
                       source={this.state.avatarSource}  
                  />
                </View>
                <View>
                    <TouchableOpacity   onPress={this.onSubmitUpload}>
                        <Image
                            style={{width: 25}}
                            source={require('./images/upload_icon3x.png')}
                        />
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        );
  }
}


/*
Set the below permission in AndroidManifest File
  <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
*/
