
var socket = io();
socket.on('connect', function() {
    console.log('Connected to server'); 
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('H:mm');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    console.log(li);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('H:mm');
    var li = jQuery('<li></li>');
    var a = jQuery('<a rel="noopener noreferrer" target="_blank">My current location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var msgTextBox = jQuery('[name=message');
    socket.emit('createMessage', {
        from: 'user',
        text: msgTextBox.val()
    }, function () {
        msgTextBox.val("");
    });
});

var locationBtn = jQuery('#sendLocation');
locationBtn.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by your browser");
    }

    locationBtn.attr('disabled', 'disabled').text('Sending location..');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationBtn.removeAttr('disabled').text('Send location');
        socket.emit('CreateLocationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationBtn.removeAttr('disabled').text('Send location');
        return alert("Unable to fetch location");
    });
});

