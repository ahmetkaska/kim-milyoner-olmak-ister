document.getElementById('openModalBtn').addEventListener('click', function () {
    document.getElementById('loginModal').style.display = 'block';
});

document.getElementById('closeModalBtn').addEventListener('click', function () {
    document.getElementById('loginModal').style.display = 'none';
});

window.addEventListener('click', function (event) {
    var modal = document.getElementById('loginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});