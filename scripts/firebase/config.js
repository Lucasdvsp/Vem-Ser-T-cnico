import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAcMtT-U-DDRVe5Zqb0aFqDZVqWJv1e1EM",
    authDomain: "vem-ser-tecnico.firebaseapp.com",
    projectId: "vem-ser-tecnico",
    storageBucket: "vem-ser-tecnico.firebasestorage.app",
    messagingSenderId: "443588265445",
    appId: "1:443588265445:web:778151c7bbcab74d659b0c"
};

const app = initializeApp(firebaseConfig);

export { app };
