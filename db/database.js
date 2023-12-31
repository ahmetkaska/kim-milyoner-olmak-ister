import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6DAqF3bIhqXOo1FBdXz-DRAWCaMikCs8",
    authDomain: "kim-milyoner-olmak-ister-96051.firebaseapp.com",
    projectId: "kim-milyoner-olmak-ister-96051",
    storageBucket: "kim-milyoner-olmak-ister-96051.appspot.com",
    messagingSenderId: "669435490875",
    appId: "1:669435490875:web:cc232dca48c3554067621e",
    measurementId: "G-38X4W84N2H"
};

const login = document.getElementById('login');
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);


login.addEventListener('click', async (e) => {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        alert('User signed in successfully.');
        window.location.href = '../allPages/App.html';

    } catch (error) {

        if (error.code === 'auth/user-not-found') {
            try {
                const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = newUserCredential.user;

                set(ref(database, 'users/' + newUser.uid), {
                    email: email,
                    password: password
                });

                alert('User created successfully.');
                window.location.href = '../allPages/App.html';

            } catch (error) {
                alert(error.message);
            }
        } else {
            alert(error.message);
        }
    }
});





/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";



const firebaseConfig = {
    apiKey: "AIzaSyB6DAqF3bIhqXOo1FBdXz-DRAWCaMikCs8",
    authDomain: "kim-milyoner-olmak-ister-96051.firebaseapp.com",
    projectId: "kim-milyoner-olmak-ister-96051",
    storageBucket: "kim-milyoner-olmak-ister-96051.appspot.com",
    messagingSenderId: "669435490875",
    appId: "1:669435490875:web:cc232dca48c3554067621e",
    measurementId: "G-38X4W84N2H"
};


const login = document.getElementById('login');
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

login.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password
            }).then(() => {

                alert('User created succesfully.');
                window.location.href = '../allPages/App.html';
            })
                .catch((error) => {

                    alert(error);
                });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });
});

*/