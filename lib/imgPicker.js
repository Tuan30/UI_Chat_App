import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native'
import userModel from '../model/userModel'

const imgPicker = async (setPhoto,setLoading) => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
      if (!result.canceled) {
        const uri           = result.uri
        const response      = await fetch(uri)
        const blob          = await response.blob();
        const uploadUri     = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let filename        = uploadUri?.substring(uploadUri.lastIndexOf('/') + 1);

        // custom name
        const extension     = filename.split('.').pop(); 
        const name          = filename.split('.').slice(0, -1).join('.');
        let nameFull        = name + Date.now() + '.' + extension;

        await userModel.uploadImage({nameFull,blob,setPhoto,setLoading})

      }
}

export default imgPicker