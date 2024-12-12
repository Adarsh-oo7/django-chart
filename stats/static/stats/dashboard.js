console.log("hello world");

const dashboardSlug = document.getElementById('dashboard-slug').textContent.trim();
console.log(dashboardSlug);  // Check the value of dashboardSlug

// Correct WebSocket URL
const websocketUrl = `ws://${window.location.host}/ws/${dashboardSlug}/`;
console.log(websocketUrl);  // Log the WebSocket URL

const socket = new WebSocket(websocketUrl);  // Create WebSocket connection
console.log(socket);  // Log the WebSocket object

socket.onmessage = function(e) {
    console.log('Server: ' + e.data);
    const data = JSON.parse(e.data);  // Parse the JSON data
    const { sender, message } = data;
    console.log(sender);
    console.log(message);
};


socket.onopen = function(e) {
    socket.send(JSON.stringify({
        'message': 'Hello from client',
        'sender': 'test sender'
    }));
};
