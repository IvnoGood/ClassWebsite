// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//or
//!https://firebase.google.com/docs/web/learn-more?hl=fr#libraries-cdn

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
const storage = getStorage(app);

const week = document.getElementById("week");
const day = document.getElementById("day");
const time = document.getElementById("time");

const fileInput = document.getElementById('timetable-input');
const uploadButton = document.getElementById('upload-btn');

var connection = localStorage.getItem("isconnected");

if (connection == false) {
    window.alert("redirecting...");
    window.location.href = "../pages/login.html";
}

onValue(dbRef(database, '/week'), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (data == "b") {
        document.getElementById("week").value = "Week B";
    } else {
        document.getElementById("week").value = "Week A";
    }

});


document.getElementById("research-button").addEventListener("click", async function () {
    if (week.value == "Week B") {
        var WeekUpdated = "B"
    } else {
        var WeekUpdated = "A"
    }
    const class1Data = await getclass1(WeekUpdated, day.value, time.value);

    console.log(class1Data);

    Object.keys(class1Data).forEach((key, index) => {
        console.log(`${class1Data[key]}`);
        const named = "class-table" + (index + 1);
        const table = document.getElementById(named);
        table.innerHTML = `${class1Data[key]}`;
    });



});

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

// Add event listener for upload button
uploadButton.addEventListener('click', function () {
    // Get the selected file
    const file = fileInput.files[0];

    if (!file) {
        alert("No file selected.");
        return;
    }

    // Create a storage reference
    const fileRef = storageRef(storage, 'uploads/' + file.name);  // Renamed to fileRef

    // Upload the file
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Monitor upload progress
    uploadTask.on('state_changed',
        (snapshot) => {
            // Progress of the upload
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed:', error);
        },
        () => {
            // Handle successful uploads
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {  // Use uploadTask.snapshot.ref here
                console.log('File available at', downloadURL);
                alert('File successfully uploaded!');
            });
        }
    );
});
