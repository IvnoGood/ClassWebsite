// Import the functions you need from the SDKs you need
import {
    initializeApp
}
    from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
//
import {
    getDatabase, ref as dbRef, onValue
}
    from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
//
import {
    getStorage, ref as storageRef, uploadBytes, uploadBytesResumable, getDownloadURL
}
    from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js"
//

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//or
//!https://firebase.google.com/docs/web/learn-more?hl=fr#libraries-cdn

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQ77lYII2_FhZGKpQ5nCcG6AXDuQwW9js",
    authDomain: "classweb-9137a.firebaseapp.com",
    databaseURL: "https://classweb-9137a-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "classweb-9137a",
    storageBucket: "classweb-9137a.appspot.com",
    messagingSenderId: "1000363116911",
    appId: "1:1000363116911:web:031c7c874b322b1fb7009a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const storage = getStorage();

const week = document.getElementById("week");
const day = document.getElementById("day");
const time = document.getElementById("time");

const fileInput = document.getElementById('timetable-input');
const uploadButton = document.getElementById('upload-btn');

var connection = localStorage.getItem("isconnected");

const FILE = document.getElementById('timetable-input').files[0];

// Create a storage reference in Firebase (you can name it something like 'uploads/' + filename)
const Ref = storageRef(storage + 'document');

// Upload the file to the storage
/* uploadBytes(Ref, FILE).then((snapshot) => {
    console.log('Uploaded a blob or file!');
}); */




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
    const classData = await getclass(WeekUpdated, day.value, time.value);

    console.log(classData);

    Object.keys(classData).forEach((key, index) => {
        console.log(`${classData[key]}`);
        const named = "class-table" + (index + 1);
        const table = document.getElementById(named);
        table.innerHTML = `${classData[key]}`;
    });



});

async function getclass(week, day, time) {
    const classRef = dbRef(database, "/" + week + "/" + day + "/" + time);
    /*     const classReft = dbRef(database, "/A/Tuesday/8:12/");
        console.log(week + "/" + day + "/" + time + "/");
        console.log(time);
        document.getElementById('test').innerHTML = "/" + week + "/" + day + "/" + time */

    // Wrap the onValue function in a Promise
    return new Promise((resolve, reject) => {
        onValue(classRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                resolve(data); // Resolve the promise with the data
            } else {
                reject('No data found in db');
            }
        }, (error) => {
            reject("error" + error);
            // Reject the promise in case of an error
        });
    });
}

// Add event listener for upload button
/* uploadButton.addEventListener('click', function () {
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
}); */

uploadButton.addEventListener('click', function () {

});