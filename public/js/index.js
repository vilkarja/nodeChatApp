
var socket = io();
socket.on('connect', function() {
    console.log('Connected to server'); 
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    console.log(li);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a rel="noopener noreferrer" target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    console.log(li);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message').val()
    }, function () {

    });
});

var locationBtn = jQuery('#sendLocation');
locationBtn.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('CreateLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        return alert("Unable to fetch location");
    });
});

