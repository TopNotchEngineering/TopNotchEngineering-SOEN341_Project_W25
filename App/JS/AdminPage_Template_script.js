document.addEventListener('DOMContentLoaded', function() {
    const parentDiv = document.getElementById('friends-icon');
    const childDiv = document.getElementById('menu');

    parentDiv.addEventListener('click', function() {
        if (childDiv.style.display === 'none' || childDiv.style.display === '') {
            childDiv.style.display = 'block';
        } else {
            childDiv.style.display = 'none';
        }
    });
});