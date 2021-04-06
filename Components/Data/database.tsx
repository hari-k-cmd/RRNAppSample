import database from '@react-native-firebase/database';

function databaseResp(){
     database()
    .ref('/')
    .once('value')
    .then(snapshot => {
    //   console.log('User data: ', snapshot.val());
    return snapshot
    }).catch(err =>{
        console.log('User error: ', err);
        return err
    });
}

export default databaseResp; 