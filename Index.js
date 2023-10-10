class NewUser {
    constructor(UserName, UserSurname, UserAge, UserLocation) {
      this.Name = UserName;
      this.Surname = UserSurname;
      this.age = UserAge;
      this.location = UserLocation;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('Register');
    const logoutButton = document.getElementById('Logout');
  
    userForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const UserName = document.getElementById('Username').value;
      const UserSurname = document.getElementById('UserSurname').value;
      const UserAge = parseInt(document.getElementById('UserAge').value);
      const UserLocation = document.getElementById('UserLocation').value;
  
      const newUser = new NewUser(UserName, UserSurname, UserAge, UserLocation);
  
      let savedUsers = getUserFromLocalStorage();
  
      if (!savedUsers) {
        savedUsers = [];
      }
  
      // Verifica se esiste già un utente con la stessa età
      const existingUserIndex = savedUsers.findIndex(user => user.age === UserAge);
  
      if (existingUserIndex !== -1) {
        // Sovrascrive solo se l'utente con la stessa età esiste
        savedUsers[existingUserIndex] = newUser;
      } else {
        savedUsers.push(newUser);
      }
  
      saveUserToLocalStorage(savedUsers);
      displayUsersByAge(UserAge);
    });
  
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('users');
      console.log('Dati utente rimossi.');
    });
  
    const savedUsers = getUserFromLocalStorage();
    if (savedUsers) {
      savedUsers.forEach(user => displayUsersByAge(user.age));
    }
  });
  
  function saveUserToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  function getUserFromLocalStorage() {
    const savedUserData = localStorage.getItem('users');
    return savedUserData ? JSON.parse(savedUserData) : null;
  }
  
  function displayUsersByAge(age) {
    console.log(`Utenti con età ${age}:`);
    const savedUsers = getUserFromLocalStorage();
    if (savedUsers) {
      const usersWithSameAge = savedUsers.filter(user => user.age === age);
      if (usersWithSameAge.length > 0) {
        usersWithSameAge.forEach(user => {
          console.log(`- Nome: ${user.Name}, Cognome: ${user.Surname}, Età: ${user.age}, Indirizzo: ${user.location}`);
        });
      } else {
        console.log(`Nessun utente trovato con età ${age}.`);
      }
    } else {
      console.log('Nessun utente registrato.');
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    let count = sessionStorage.getItem('count') || 0; // Recupera il valore precedente o inizia da zero
    const counterElement = document.getElementById('counter');
  
    // Funzione per aggiornare il contatore e visualizzarlo
    function updateCounter() {
      count++;
      counterElement.textContent = `Tempo impiegato per la registrazione: ${count}`;
      sessionStorage.setItem('count', count);
    }
  
    // Aggiorna il contatore ogni secondo
    const intervalId = setInterval(updateCounter, 1000);
  
    // Pulisci l'intervallo quando la pagina viene chiusa o refreshata
    window.addEventListener('beforeunload', () => {
      clearInterval(intervalId);
    });
  });
  