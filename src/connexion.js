const signIn = document.querySelector(".button2");
signIn.addEventListener("click", async function () {
  // Récupérer les données du formulaire
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Créer un objet contenant les données de l'utilisateur
  const user = {
    firstname,
    lastname,
    email,
    password,
  };

  try {
    // Effectuer une requête POST vers le backend
    const response1 = await fetch('https://kpopnation-backend.cluster-ig3.igpolytech.fr/user/register', {
      method: 'POST',
      headers: {
        'Acces-Control-Allow-Origin': 'https://kpop-nation-95ro.onrender.com/', //autoriser le domaine d'origine
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    // Vérifier la réponse du serveur
    if (response1.ok) {
      const data = await response1.json();
      // Utilisateur créé avec succès
      console.log('Utilisateur créé :', data);
      // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
      document.querySelector(".form").innerHTML = "";
      const affichageRep = document.querySelector(".titre");
      const reponseConnexion = document.createElement("h3");
      reponseConnexion.innerText = "Inscription réussie, vous pouvez maintenant vous connecter.";
      affichageRep.appendChild(reponseConnexion);
      // Attendre 3 secondes (3000 millisecondes)
      setTimeout(function() {
      // Rediriger l'utilisateur vers une autre page après 3 secondes
        window.location.href = "./index.html";
      }, 3000);
    } else {
      const errorData = await response1.json();
      // Une erreur s'est produite lors de la création de l'utilisateur
      console.log('Erreur lors de la création de l\'utilisateur:', errorData.message);
      // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
      document.querySelector(".form").innerHTML = "";
      const affichageRep = document.querySelector(".titre");
      const reponseConnexion = document.createElement("h3");
      reponseConnexion.innerText = 'Erreur lors de la création de l\'utilisateur:', errorData.message;
      affichageRep.appendChild(reponseConnexion);
      // Attendre 3 secondes (3000 millisecondes)
      setTimeout(function() {
      // Rediriger l'utilisateur vers une autre page après 3 secondes
        //window.location.href = "https://kpop-nation-95ro.onrender.com/connexion.html";
        window.location.href = "./connexion.html";
      }, 3000);
    }
    console.log(response);
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    console.log('Erreur lors de la requête:', error.message);
    // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
    document.querySelector(".form").innerHTML = "";
    const affichageRep = document.querySelector(".titre");
    const reponseConnexion = document.createElement("h3");
    reponseConnexion.innerText = 'Erreur lors de la requête:', error.message;
    affichageRep.appendChild(reponseConnexion);
    // Attendre 3 secondes (3000 millisecondes)
    setTimeout(function() {
    // Rediriger l'utilisateur vers une autre page après 3 secondes
      window.location.href = "./connexion.html";
    }, 3000);
  }
});


const login = document.querySelector(".button1");
login.addEventListener("click", async function () {
  // Récupérer les données du formulaire
  const userEmail = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Créer un objet contenant les données de l'utilisateur
  const user = {
    userEmail,
    password,
    // isAdmin: false // Par défaut, l'utilisateur n'est pas un administrateur
  };
  console.log(user.userEmail);

  try {
    // Effectuer une requête POST vers le backend
    const response = await fetch('https://kpopnation-backend.cluster-ig3.igpolytech.fr/user/login', {
      method: 'POST',
      headers: {
        'Acces-Control-Allow-Origin': 'https://kpop-nation-95ro.onrender.com/', //autoriser le domaine d'origine
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    // Vérifier la réponse du serveur
    if (response.ok) {
      const data = await response.json();
      //enregistrement d'un token
      // Get the JWT
      const token = data.token;
      console.log(token);
      // Store the JWT in local storage or a cookie
      localStorage.setItem('token', token);
      // Utilisateur connecté avec succès
      console.log('Utilisateur connecté :', data);
      // Faire quelque chose ici, comme rediriger l'utilisateur vers une page de succès
      document.querySelector(".form").innerHTML = "";
      const affichageRep = document.querySelector(".titre");
      const reponseConnexion = document.createElement("h3");
      reponseConnexion.innerText = "Connexion réussie, vous allez être redirigé vers la page d'accueil.";
      affichageRep.appendChild(reponseConnexion);
      // Attendre 3 secondes (3000 millisecondes)
      setTimeout(function() {
      // Rediriger l'utilisateur vers une autre page après 3 secondes
        window.location.href = "./index.html";
      }, 3000);
      
    } else {
      const errorData = await response.json();
      // Une erreur s'est produite lors de la création de l'utilisateur
      console.log('Erreur lors de la connexion de l\'utilisateur:', errorData.message);
      // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
      document.querySelector(".form").innerHTML = "";
      const affichageRep = document.querySelector(".titre");
      const reponseConnexion = document.createElement("h3");
      reponseConnexion.innerText = 'Erreur lors de la connexion de l\'utilisateur:', errorData.message;
      affichageRep.appendChild(reponseConnexion);
      // Attendre 3 secondes (3000 millisecondes)
      setTimeout(function() {
      // Rediriger l'utilisateur vers une autre page après 3 secondes
        window.location.href = "./connexion.html";
      }, 3000);
    }
    console.log(response);
  } catch (error) {
    // Une erreur s'est produite lors de la requête
    console.log('Erreur lors de la requête:', error.message);
    // Faire quelque chose ici pour afficher l'erreur à l'utilisateur
    document.querySelector(".form").innerHTML = "";
    const affichageRep = document.querySelector(".titre");
    const reponseConnexion = document.createElement("h3");
    reponseConnexion.innerText = 'Erreur lors de la requête:', error.message;
    affichageRep.appendChild(reponseConnexion);
    // Attendre 3 secondes (3000 millisecondes)
    setTimeout(function() {
    // Rediriger l'utilisateur vers une autre page après 3 secondes
      window.location.href = "./connexion.html";
    }, 3000);
  }
});

