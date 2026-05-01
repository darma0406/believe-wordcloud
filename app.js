import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  increment,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  projectId: "believe-darma0406",
  appId: "1:1006614313903:web:d76671ee10f0c4ebb48d5a",
  storageBucket: "believe-darma0406.firebasestorage.app",
  apiKey: "AIzaSyC5Te6RpQz7h37Gs9WNbxLUxOAf7XV6nyU",
  authDomain: "believe-darma0406.firebaseapp.com",
  messagingSenderId: "1006614313903"
};

const palette = ["#1e6f4a", "#965c21", "#2a617a", "#7b3f52", "#4b6a2a", "#4d5686", "#8a3c2f"];
const positions = [
  [50, 48, 0],
  [34, 34, -7],
  [66, 35, 6],
  [32, 64, 8],
  [68, 64, -8],
  [48, 24, 3],
  [50, 74, -3],
  [21, 48, -12],
  [79, 49, 12],
  [18, 23, 10],
  [82, 26, -10],
  [20, 76, -6],
  [80, 77, 7],
  [43, 61, 11],
  [58, 59, -11]
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wordsRef = collection(db, "wordcloud_words");

const form = document.querySelector("#wordForm");
const input = document.querySelector("#wordInput");
const status = document.querySelector("#status");
const cloud = document.querySelector("#wordCloud");
const emptyState = document.querySelector("#emptyState");
const wordList = document.querySelector("#wordList");
const wordCount = document.querySelector("#wordCount");

function normalizeWord(value) {
  return value.trim().replace(/\s+/g, " ").slice(0, 24);
}

function idForWord(word) {
  return encodeURIComponent(word.toLowerCase()).replaceAll(".", "%2E");
}

function setStatus(text, state) {
  status.textContent = text;
  status.className = `status ${state ? `is-${state}` : ""}`.trim();
}

function render(words) {
  cloud.replaceChildren();
  wordList.replaceChildren();
  emptyState.classList.toggle("is-hidden", words.length > 0);
  wordCount.textContent = String(words.length);

  const maxCount = Math.max(1, ...words.map((item) => item.count));

  words.slice(0, 42).forEach((item, index) => {
    const [left, top, angle] = positions[index % positions.length];
    const scale = item.count / maxCount;
    const size = 1.05 + scale * 4.8;
    const word = document.createElement("button");
    word.type = "button";
    word.className = "cloud-word";
    word.style.left = `${left}%`;
    word.style.top = `${top}%`;
    word.style.fontSize = `clamp(1rem, ${size}vw, 5.8rem)`;
    word.style.setProperty("--angle", `${angle}deg`);
    word.style.setProperty("--word-color", palette[index % palette.length]);
    word.title = `${item.text}：${item.count}`;
    word.textContent = item.text;
    cloud.append(word);
  });

  words.forEach((item) => {
    const row = document.createElement("li");
    row.className = "word-item";

    const text = document.createElement("span");
    text.className = "word-text";
    text.textContent = item.text;

    const score = document.createElement("span");
    score.className = "word-score";
    score.textContent = item.count;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-button";
    remove.textContent = "x";
    remove.title = `刪除 ${item.text}`;
    remove.addEventListener("click", async () => {
      await deleteDoc(doc(db, "wordcloud_words", item.id));
    });

    row.append(text, score, remove);
    wordList.append(row);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = normalizeWord(input.value);
  if (!text) return;

  const submitButton = form.querySelector("button");
  submitButton.disabled = true;
  setStatus("寫入中", "");

  try {
    const ref = doc(db, "wordcloud_words", idForWord(text));
    const existing = await getDoc(ref);
    if (existing.exists()) {
      await updateDoc(ref, {
        count: increment(1),
        updatedAt: serverTimestamp()
      });
    } else {
      await setDoc(ref, {
        text,
        count: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    input.value = "";
    input.focus();
  } catch (error) {
    console.error(error);
    setStatus("寫入失敗", "error");
  } finally {
    submitButton.disabled = false;
  }
});

onSnapshot(
  wordsRef,
  (snapshot) => {
    const words = snapshot.docs
      .map((entry) => ({ id: entry.id, ...entry.data() }))
      .filter((entry) => typeof entry.text === "string")
      .map((entry) => ({ ...entry, count: Number(entry.count || 1) }))
      .sort((a, b) => b.count - a.count || a.text.localeCompare(b.text, "zh-Hant"));

    render(words);
    setStatus("即時同步", "live");
  },
  (error) => {
    console.error(error);
    setStatus("連線失敗", "error");
  }
);
