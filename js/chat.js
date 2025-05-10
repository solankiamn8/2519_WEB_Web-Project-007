import { auth, db, getUserData } from './auth.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js';
import { collection, doc, getDocs, query, where, addDoc, onSnapshot, orderBy, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js';

let currentUserId = null;
let currentChatUserId = null;

// Fetch buddies with shared goals/workouts/location
async function findMatches(currentUser) {
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);
  const matchesList = document.getElementById('matches-list');
  matchesList.innerHTML = '';

  querySnapshot.forEach((docSnap) => {
    const buddy = docSnap.data();
    const buddyId = docSnap.id;

    if (buddyId === currentUser.uid) return;

    const sharedGoal = buddy.fitnessGoal === currentUser.fitnessGoal;
    const sharedWorkout = currentUser.preferredWorkouts?.some(w => buddy.preferredWorkouts?.includes(w));
    const sharedLocation = buddy.location === currentUser.location;

    if (sharedGoal && sharedWorkout && sharedLocation) {
      const li = document.createElement('li');
      li.textContent = buddy.name || buddy.email;
      li.addEventListener('click', () => startChat(buddyId, buddy.name || buddy.email));
      matchesList.appendChild(li);
    }
  });
}

// Start chat with buddy
function startChat(buddyId, buddyName) {
  currentChatUserId = buddyId;
  document.getElementById('chat-user-name').textContent = buddyName;
  document.getElementById('chat-section').style.display = 'block';
  loadMessages();
}

// Load messages
function loadMessages() {
  const chatId = [currentUserId, currentChatUserId].sort().join('_');
  const chatRef = collection(db, 'messages', chatId, 'chats');
  const q = query(chatRef, orderBy('timestamp'));

  onSnapshot(q, (snapshot) => {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const div = document.createElement('div');
      div.textContent = `${msg.sender === currentUserId ? 'You' : msg.senderName}: ${msg.text}`;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Send message
document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('chat-input').value.trim();
  if (!msg) return;

  const senderName = (await getUserData(currentUserId)).name || 'You';
  const chatId = [currentUserId, currentChatUserId].sort().join('_');
  const msgRef = collection(db, 'messages', chatId, 'chats');

  await addDoc(msgRef, {
    sender: currentUserId,
    senderName,
    text: msg,
    timestamp: serverTimestamp()
  });

  document.getElementById('chat-input').value = '';
});

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  currentUserId = user.uid;

  const userData = await getUserData(user.uid);
  if (userData) {
    await findMatches({ ...userData, uid: user.uid });
  }
});
