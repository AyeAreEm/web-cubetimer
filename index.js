import express from "express";
import { generateScrambleSync } from "scrambled";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, getDoc, doc, setDoc, addDoc} from "firebase/firestore";

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
const db = getFirestore(fbapp);
// const docRef = doc(db, "3x3 pll", "felix");
// const docSnapshot = await getDoc(docRef);

// if (docSnapshot.exists()) {
//     console.log(docSnapshot.data());
// } else {
//     console.log("no doc")
// }

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

//! User Related Routes 

app.get("/sign-in", (req, res) => {
    res.render("credentials", {
        logType: "sign-in",
        title: "Sign In",
        logOption: {link: "/sign-up", option: "Create an account?"},
        resetPasswOp: {link: "/reset-password", option: "Forgot password?"}
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
        logOption: {link: "/sign-in", option: "Already have an account?"},
        resetPasswOp: false
    })
})

app.post("/sign-up", (req, res) => {
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
        createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(userCreds => {
            const userUid = userCreds.user.uid;

            Promise.all([
                setDoc(doc(db, "3x3 oll", userUid), {
                    oll1: "R U2 R2 F R F' U2 R' F R F'",
                    oll2: "F R U R' U' F' f R U R' U' f'",
                    oll3: "f R U R' U' f' U' F R U R' U' F'",
                    oll4: "f R U R' U' f' U F R U R' U' F'",
                    oll5: "y2 l' U2 L U L' U l",
                    oll6: "r U2 R' U' R U' r'",
                    oll7: "r U R' U R U2 r'",
                    oll8: "l' U' L U' L' U2 l",
                    oll9: "R U R' U' R' F R2 U R' U' F'",
                    oll10: "R U R' U R' F R F' R U2 R'",
                    oll11: "r U R' U R' F R F' R U2 r'",
                    oll12: "F R U R' U' F' U F R U R' U' F'",
                    oll13: "F U R U' R2 F' R U R U' R'",
                    oll14: "R' F R U R' F' R F U' F'",
                    oll15: "l' U' l L' U' L U l' U l",
                    oll16: "r U r' R U R' U' r U' r'",
                    oll17: "R U R' U R' F R F' U2 R' F R F'",
                    oll18: "r U R' U R U2 r2 U' R U' R' U2 r",
                    oll19: "r' R U R U R' U' M' R' F R F'",
                    oll20: "r U R' U' M2 U R U' R' U' M'",
                    oll21: "R U2 R' U' R U R' U' R U' R'",
                    oll22: "R U2 R2 U' R2 U' R2 U2 R",
                    oll23: "R2 D R' U2 R D' R' U2 R'",
                    oll24: "r U R' U' r' F R F'",
                    oll25: "F' r U R' U' r' F R",
                    oll26: "R U2 R' U' R U' R'",
                    oll27: "R U R' U R U2 R'",
                    oll28: "r U R' U' r' R U R U' R'",
                    oll29: "R U R' U' R U' R' F' U' F R U R'",
                    oll30: "F U R U2 R' U' R U2 R' U' F'",
                    oll31: "R' U' F U R U' R' F' R",
                    oll32: "L U F' U' L' U L F L'",
                    oll33: "R U R' U' R' F R F'",
                    oll34: "R U R2 U' R' F R U R U' F'",
                    oll35: "R U2 R2 F R F' R U2 R'",
                    oll36: "L' U' L U' L' U L U L F' L' F",
                    oll37: "F R' F' R U R U' R'",
                    oll38: "R U R' U R U' R' U' R' F R F'",
                    oll39: "L F' L' U' L U F U' L'",
                    oll40: "R' F R U R' U' F' U R",
                    oll41: "R U R' U R U2 R' F R U R' U' F'",
                    oll42: "R' U' R U' R' U2 R F R U R' U' F'",
                    oll43: "f' L' U' L U f",
                    oll44: "f R U R' U' f'",
                    oll45: "F R U R' U' F'",
                    oll46: "R' U' R' F R F' U R",
                    oll47: "F' L' U' L U L' U' L U F",
                    oll48: "F R U R' U' R U R' U' F'",
                    oll49: "r U' r2 U r2 U r2 U' r",
                    oll50: "r' U r2 U' r2 U' r2 U r'",
                    oll51: "F U R U' R' U R U' R' F'",
                    oll52: "R U R' U R U' B U' B' R'",
                    oll53: "r' U' R U' R' U R U' R' U2 r",
                    oll54: "r U2 R' U' R U R' U' R U' r'",
                    oll55: "R' F R U R U' R2 F' R2 U' R' U R U R'",
                    oll56: "r U r' U R U' R' U R U' R' r U' r'",
                    oll57: "R U R' U' M' U R U' r'"
                }),
                setDoc(doc(db, "3x3 pll", userUid), {
                    aaperm: "x R' U R' D2 R U' R' D2 R2",
                    abperm: "x R2 D2 R U R' D2 R U' R",
                    eperm: "x' L' U L D' L' U' L D L' U' L D' L' U L D",
                    fperm: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
                    gaperm: "R2 U R' U R' U' R U' R2 U' D R' U R D'",
                    gbperm: "R' U' R U D' R2 U R' U R U' R U' R2 D",
                    gcperm: "R2 U' R U' R U R' U R2 U D' R U' R' D",
                    gdperm: "R U R' U' D R2 U' R U' R' U R' U R2 D'",
                    hperm: "M2 U M2 U2 M2 U M2",
                    japerm: "R' U L' U2 R U' R' U2 R L",
                    jbperm: "R U R' F' R U R' U' R' F R2 U' R'",
                    naperm: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
                    nbperm: "R' U R U' R' F' U' F R U R' F R' F' R U' R",
                    raperm: "R U' R' U' R U R D R' U' R D' R' U2 R'",
                    rbperm: "R2 F R U R U' R' F' R U2 R' U2 R",
                    tperm: "R U R' U' R' F R2 U' R' U' R U R' F'",
                    uaperm: "M2 U M U2 M' U M2",
                    ubperm: "M2 U' M U2 M' U' M2",
                    vperm: "R' U R' U' y R' F' R2 U' R' U R' F R F",
                    yperm: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
                    zperm: "M2 U M2 U M' U2 M2 U2 M'"
                }),
                setDoc(doc(db, `solves/${userUid}/${userUid}2`, "init"), {}),
                setDoc(doc(db, `solves/${userUid}/${userUid}3`, "init"), {}),
                setDoc(doc(db, `solves/${userUid}/${userUid}4`, "init"), {}),
            ]).catch(error => {
                console.log(error)
                res.sendStatus(500)
            })
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.sendStatus(400);
        });
    }).catch(error => {
        res.sendStatus(500)
    })
})

app.get("/reset-password", (req, res) => {
    res.render("reset");
})

app.post("/reset-password", (req, res) => {
    sendPasswordResetEmail(auth, req.body.email)
        .then(() => {
            res.sendStatus(200);
        }).catch((error => {
            if (error.code == "auth/user-not-found") {
                res.sendStatus(400);
            } else {
                res.sendStatus(500);
            }
        }))
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

//! Cube Related Routes

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
    console.log(req.body.scramble)

    res.sendStatus(200)
});

const port = process.env.PORT || 5000;
app.listen(port);