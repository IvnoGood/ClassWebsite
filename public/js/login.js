import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
//  https://firebase.google.com/docs/web/setup#available-libraries
//  or
//! https://firebase.google.com/docs/web/learn-more?hl=fr#libraries-cdn

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQ77lYII2_FhZGKpQ5nCcG6AXDuQwW9js",
    authDomain: "class1web-9137a.firebaseapp.com",
    databaseURL: "https://classweb-9137a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "class1web-9137a",
    storageBucket: "class1web-9137a.appspot.com",
    messagingSenderId: "1000363116911",
    appId: "1:1000363116911:web:031c7c874b322b1fb7009a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

let connection = localStorage.getItem("isconnected");
console.log(connection);

if (connection == null) {
    localStorage.setItem("isconnected", false);
    console.log("LocalStorage key 'isconnected' was not found, creating it with default value.");
    connection = false;
}

if (connection == "true") {
    window.location.href = "../index.html";
}

document.getElementById("login-button").addEventListener("click", () => {
    onValue(ref(database, '/password'), (snapshot) => {
        const data = snapshot.val();
        if (document.getElementById("login-password").value == data) {
            localStorage.setItem("isconnected", "true");
            window.location.href = "../index.html";
        }
    });
})