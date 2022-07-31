import express from "express";
import { generateScrambleSync } from "scrambled";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = express();
const firebaseConfig = {
    apiKey: "AIzaSyD-vLpOFmHJ_wLFk7Y6haQygy2enjuo6K8",
    authDomain: "cubetimer-341bc.firebaseapp.com",
    projectId: "cubetimer-341bc",
    storageBucket: "cubetimer-341bc.appspot.com",
    messagingSenderId: "229533532995",
    appId: "1:229533532995:web:4fc6b2b8f4abdc683da5f6"
};
 
const fbapp = initializeApp(firebaseConfig);
const auth = getAuth(fbapp);
let uid;
onAuthStateChanged(auth, (acc) => {
    if (acc) {
        uid = acc.uid;
    }
})

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.json({ limit: '10Mb'}))

app.get("/", (req, res) => {
    res.render("index", {
        user: uid
    });
})

app.get("/sign-in", (req, res) => {
    res.render("credentials", {
        logType: "sign-in",
        title: "Sign In",
        logOption: {link: "/sign-up", option: "Create an account?"}
    });
})

app.post("/sign-in", (req, res) => {
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, req.body.email, req.body.password)
                .then(userCreds => {
                    // uid = userCreds.user.uid;
                    res.sendStatus(200);
                })
                .catch(error => {
                    res.sendStatus(500)
                });
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

app.get("/sign-up", (req, res) => {
    res.render("credentials", {
        logType: "sign-up",
        title: "Sign Up",
        logOption: {link: "/sign-in", option: "Already have an account?"} 
    })
})

app.post("/sign-up", (req, res) => {
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
        createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(userCreds => {
            // uid = userCreds.user.uid;
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.sendStatus(400);
        });
    }).catch(error => {
        res.sendStatus(500)
    })
})

app.post("/sign-out", (req, res) => {
    signOut(auth).then(() => {
        uid = undefined;
        res.sendStatus(200)
    }).catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
})

app.get("/2x2", (req, res) => {
    if (uid == undefined) {
        res.redirect("/sign-in")
    } else {
        let scramble = generateScrambleSync(11, 2);
        res.render("timer-temp", {
            event: "2x2",
            subEvents: [{title: "2x2 PLL", link: "/2x2/alg/pll"}, {title: "2x2 OLL", link: "/2x2/alg/oll"}],
            scramble: scramble,
            scrambleImg: `http://cube.rider.biz/visualcube.php?fmt=svg&size=150&pzl=2&alg=${scramble.scramble}`
        });
    }
})

app.get("/3x3", (req, res) => {
    if (uid == undefined) {
        res.redirect("/sign-in")
    } else {
        let scramble = generateScrambleSync(20, 3);
        res.render("timer-temp", {
            user: uid,
            event: "3x3",
            subEvents: [{title: "3x3 PLL", link: "/3x3/alg/pll"}, {title: "3x3 OLL", link: "/3x3/alg/oll"}],
            scramble: scramble,
            scrambleImg: `http://cube.rider.biz/visualcube.php?fmt=svg&size=150&pzl=3&alg=${scramble.scramble}`
        });
    }
})

app.post("/3x3", (req, res) => {
    console.log(req.body.time);
    console.log(req.body.uid)

    res.sendStatus(200)
});

const port = process.env.PORT || 5000;
app.listen(port);