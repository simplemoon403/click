document.addEventListener('DOMContentLoaded', function () {
    var clickableImages = document.querySelectorAll('.clickable-image');
    var clickCounts = {};

    clickableImages.forEach(function (image) {
        var imageId = image.getAttribute('data-image-id');
        clickCounts[imageId] = 0;

        image.addEventListener('click', function () {
            clickCounts[imageId]++;
            var clickTime = new Date().toISOString();
            sendClickInfoToServer(imageId, clickTime);
        });
    });

    function sendClickInfoToServer(imageId, clickTime) {
        var data = {
            imageId: imageId,
            clickTime,
        };

        fetch('http://192.168.203.5:3000/log-click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log('Úspěšně zaznamenáno: ', data))
        .catch(error => console.error('Chyba při odesílání dat: ', error));
    }
});