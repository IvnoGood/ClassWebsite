// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//or
//https://firebase.google.com/docs/web/learn-more?hl=fr#libraries-cdn

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

// Example usage
/* const name = "text"
const email = "text"
const userId = "06177"
set(ref(database, 'users/' + userId), {
    username: name,
    email: email
}); */

/* const list = document.getElementById('anrede');

['Herr', 'Frau'].forEach(item => {
    let option = document.createElement('option');
    option.value = item;
    list.appendChild(option);
}); */

onValue(ref(database, '/week'), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (data == "b") {
        document.getElementById("week").value = "Week B";
    } else {
        document.getElementById("week").value = "Week A";
    }

});

const week = document.getElementById("week");
const day = document.getElementById("day");
const time = document.getElementById("time");

document.getElementById('research-button').addEventListener("click", async function () {
    if (week.value == "Week B") {
        var WeekUpdated = "B"
    } else {
        var WeekUpdated = "A"
    }
    /* var class1 = getclass1(WeekUpdated, day.value, time.value)
    console.log(class1) */

    try {
        const class1Data = await getclass1(WeekUpdated, day.value, time.value);
        console.log(class1Data); // Logs the data retrieved from the database
    } catch (error) {
        console.error("Error retrieving class1 data:", error);
    }
});



/* function getclass1(week, day, time) {
    var class1 = onValue(ref(database, week + "/" + day + "/" + time + "/"), (snapshot) => {
        const data = snapshot.val();
        return data;
    });
    return class1;
} */

async function getclass1(week, day, time) {
    const class1Ref = ref(database, week + "/" + day + "/" + time + "/");

    // Wrap the onValue function in a Promise
    return new Promise((resolve, reject) => {
        onValue(class1Ref, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                resolve(data); // Resolve the promise with the data
            } else {
                reject('No data found');
            }
        }, (error) => {
            reject(error); // Reject the promise in case of an error
        });
    });
}