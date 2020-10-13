import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAJwyJZOTOjLXIf29ev8PJComs1KLfiVSY",
    authDomain: "hiyatri-85a91.firebaseapp.com",
    databaseURL: "https://hiyatri-85a91.firebaseio.com",
    projectId: "hiyatri-85a91",
    storageBucket: "hiyatri-85a91.appspot.com",
    messagingSenderId: "580256861481",
    appId: "1:580256861481:web:9e6983d24de9d24e117b38"
}
firebase.initializeApp(config)
export default firebase