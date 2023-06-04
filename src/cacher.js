const token = localStorage.getItem('token');
console.log(token);


if (token !== null) {

    document.getElementById("connexion-link").style.display = "none";
    document.getElementById("compte-link").style.display = "block";
}
else {
    document.getElementById("compte-link").style.display = "none";
    document.getElementById("connexion-link").style.display = "block";
}