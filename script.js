let touchStartX = 0;
let touchEndX = 0;

// Listen for the start of the touch
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

// Listen for the end of the touch
document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  // Swipe Right (moves finger left to right)
  if (touchEndX > touchStartX + 100) {
    showSection('profile'); // Replace with your function name
  }
  
  // Swipe Left (moves finger right to left)
  if (touchEndX < touchStartX - 100) {
    showSection('chat'); 
  }
}function openLink() {
  window.open('https://yourlink.com', '_blank');
}
// 1. Follow Button Logic
let isFollowing = false;
function toggleFollow() {
  const btn = document.getElementById('follow-btn');
  isFollowing = !isFollowing;
  
  btn.innerText = isFollowing ? 'Following' : 'Follow';
  btn.style.backgroundColor = isFollowing ? '#ccc' : '#007bff'; 
}

// 2. Like Button Logic
let likes = 0;
function toggleLike() {
  likes++;
  document.getElementById('like-count').innerText = likes;
  // Optional: Add a "pop" animation class here
}

// 3. Copy Link Logic
function copyProfileLink() {
  const profileUrl = window.location.href; // Or a specific user URL
  
  navigator.clipboard.writeText(profileUrl).then(() => {
    const copyBtn = document.getElementById('copy-link-btn');
    const originalText = copyBtn.innerText;
    
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
      copyBtn.innerText = originalText;
    }, 2000);
  });
}
function sendNotification(type, username) {
    const toast = document.getElementById('notification-toast');
    const message = document.getElementById('notif-message');
    
    // Customize the message based on the action
    let text = "";
    switch(type) {
        case 'like': text = `❤️ ${username} liked your video`; break;
        case 'comment': text = `💬 ${username} commented on your post`; break;
        case 'share': text = `🔗 ${username} shared your video`; break;
        default: text = "New activity on your account";
    }
    
    message.innerText = text;
    toast.classList.add('show');

    // Hide it after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Example: Trigger this when the Like button is clicked
// In your HTML: <button onclick="sendNotification('like', 'Alex')">❤️</button>
window.onload = () => {
    setTimeout(() => {
        sendNotification('comment', 'Sarah_Dev');
    }, 5000); // Sends a fake notification after 5 seconds
};
function toggleFollow() {
    const btn = document.getElementById('follow-btn');
    
    // Check if it's already followed
    if (!btn.classList.contains('is-followed')) {
        btn.classList.add('is-followed');
        btn.innerText = '✅'; // Changes + to checkmark
        
        // Optional: Trigger a notification
        sendNotification('follow', 'Alex_Fexin'); 
    } else {
        // Optional: Allow unfollowing
        btn.classList.remove('is-followed');
        btn.innerText = '+';
    }
}
function toggleFollow() {
    const btn = document.getElementById('follow-btn');
    btn.classList.toggle('is-followed');
    
    if (btn.classList.contains('is-followed')) {
        btn.innerHTML = '✓';
    } else {
        btn.innerHTML = '+';
    }
}
function heartPop(e) {
    const heart = document.getElementById('heart-animation');
    heart.classList.add('heart-pop-anim');
    
    // Also trigger your notification and like counter
    sendNotification('like', 'You');
    
    setTimeout(() => {
        heart.classList.remove('heart-pop-anim');
    }, 8000);
}
function toggleFollow() {
    const btn = document.getElementById('follow-btn');
    btn.classList.toggle('is-followed');
    
    const isFollowed = btn.classList.contains('is-followed');
    btn.innerHTML = isFollowed ? '✓' : '+';
    
    // Save to the browser's memory
    localStorage.setItem('fexin_followed', isFollowed);
}

// Add this to run when the page loads
window.onload = () => {
    const savedStatus = localStorage.getItem('fexin_followed');
    const btn = document.getElementById('follow-btn');
    
    if (savedStatus === 'true') {
        btn.classList.add('is-followed');
        btn.innerHTML = '✓';
    }
};
function openComments() {
    document.getElementById('comment-drawer').classList.add('open');
}

function closeComments() {
    document.getElementById('comment-drawer').classList.remove('open');
}
const fexitData = [
    {
        id: 1,
        username: "@Alex_Fexin",
        videoUrl: "video1.mp4",
        description: "Check out this HD view! #Fexin #NewApp",
        likes: "1.2k",
        comments: 45
    },
    {
        id: 2,
        username: "@Tech_Guru",
        videoUrl: "video2.mp4",
        description: "Coding the future of Fexit.com 💻",
        likes: "850",
        comments: 12
    }
];
function loadFeed() {
    const feedContainer = document.getElementById('main-feed');
    feedContainer.innerHTML = fexitData.map(post => `
        <div class="video-post" id="post-${post.id}">
            <video src="${post.videoUrl}" loop muted onclick="this.play()"></video>
            <div class="post-overlay">
                <h3>${post.username}</h3>
                <p>${post.description}</p>
            </div>
            <div class="side-actions">
                <div class="user-profile-container">
                    <img src="avatar.png" class="avatar-img">
                    <button class="follow-badge" onclick="toggleFollow(this)">+</button>
                </div>
                <button class="action-btn" onclick="handleLike(${post.id})">❤️ <br><span>${post.likes}</span></button>
                <button class="action-btn" onclick="openComments()">💬 <br><span>${post.comments}</span></button>
            </div>
        </div>
    `).join('');
}

// Run this when the page starts
window.onload = loadFeed;
let userLikes = JSON.parse(localStorage.getItem('fexit_user_likes')) || [];

function handleLike(postId) {
    if (!userLikes.includes(postId)) {
        userLikes.push(postId);
        localStorage.setItem('fexit_user_likes', JSON.stringify(userLikes));
        
        // Visual feedback
        sendNotification('like', 'You');
        // Logic to increment the number on UI would go here
    }
}
