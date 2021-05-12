function validateEmail(email) {
  return /^\s*\w{5,}@[a-z]+\.[a-z]+\s*$/i.test(email);
}

class User {
  constructor (firstName = 'Homer', lastName = 'Simpson') {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

function getUsersEmails(users) {
  return users.map(user => user.email);
}

module.exports = { validateEmail, User, getUsersEmails};