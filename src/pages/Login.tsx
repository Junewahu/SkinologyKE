import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [galleryUploads, setGalleryUploads] = useState([]);

  const handleAuth = async () => {
    // Pseudo-code for Firebase Auth
    if (window.firebase) {
      if (isLogin) {
        await window.firebase.auth().signInWithEmailAndPassword(email, password);
      } else {
        await window.firebase.auth().createUserWithEmailAndPassword(email, password);
      }
      alert("Success!");
    } else {
      alert("Firebase not loaded.");
    }
  };

  useEffect(() => {
    // Load user data from Firestore (pseudo-code)
    if (user && window.firebase) {
      window.firebase.firestore().collection('diagnosis').where('user', '==', user.uid).onSnapshot(snapshot => {
        setDiagnosisHistory(snapshot.docs.map(doc => doc.data()));
      });
      window.firebase.firestore().collection('routines').doc(user.uid).get().then(doc => {
        setRoutines(doc.data());
      });
      window.firebase.firestore().collection('gallery').where('user', '==', user.uid).onSnapshot(snapshot => {
        setGalleryUploads(snapshot.docs.map(doc => doc.data()));
      });
    }
  }, [user]);

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Register"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border rounded px-2 py-1 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border rounded px-2 py-1 mb-4 w-full"
      />
      <Button onClick={handleAuth} className="w-full mb-2">{isLogin ? "Login" : "Register"}</Button>
      <Button variant="outline" onClick={() => setIsLogin(!isLogin)} className="w-full">
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </Button>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Your Profile</h2>
        <div>Email: {user?.email}</div>
        <div className="mt-4">
          <h3 className="font-bold">Diagnosis History</h3>
          <ul>{diagnosisHistory.map((d, i) => <li key={i}>{d.date}: {d.result}</li>)}</ul>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Saved Routines</h3>
          <pre>{JSON.stringify(routines, null, 2)}</pre>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">Your Gallery Uploads</h3>
          <ul>{galleryUploads.map((g, i) => <li key={i}>{g.caption}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
