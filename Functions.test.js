const {describe, test, expect, beforeAll} = require('@jest/globals');
const {validateEmail, User, getUsersEmails} = require('./Functions.js');
const {getUsers} = require('./Async-functions.js');

const validEmailsToCheck = [
  'example@gmail.com',
  'EXAMPLE@GMAIL.COM',
  'ExAmPlE@mail.ru',
  '        example@gmail.com         ',
  '        example@gmail.com',
  'example@gmail.com         ',
  'exmpl@mail.ru',
  'example12@gmail.com',
  '12example@gmail.com',
];

const invalidEmailsToCheck = [
  'exmp@gmail.ru',
  'exm@mail.ru',
  'example @gmail.com',
  'example@gmail. com',
  'example@mailru',
  'exmple@mailru.',
  '.example@mailru',
  'exm@.mailru',
  'exm@.',
  'examplemail.ua',
  '@examplemail.ua',
  'examplemail.ua@',
  'example@12gmail.com',
  'example@gmail.12',
  'ex!ample@gmail.com',
  'ex?ample@gmail.com',
  'ex,ample@gmail.com',
  'ex@..a@mple@gmail.com',
  'ex.ample@gmail.com'
];

describe('Testing function validateEmail with different emails.', () => {
  describe('Should return true with valid emails.', () => {
    test('Returns true for valid emails.', () => {
      for (const email of validEmailsToCheck) {
        expect(validateEmail(email)).toBe(true);
      }
    });
  });

  describe('Should return false with invalid emails.', () => {
    test('Returns false for invalid emails.', () => {
      for (const email of invalidEmailsToCheck) {
        expect(validateEmail(email)).toBe(false);
      }
    });
  });
});

describe('Testing class User.', () => {
  describe('Passing both arguments to the User constructor.', () => {
    const user = new User('Dmytro', 'Khyzhniak');

    test('Returned object properties and values are correct.', () => {
      expect(user).toEqual({
        firstName: 'Dmytro',
        lastName: 'Khyzhniak'
      });
    });

    test('Method getFullName() returns correct result.', () => {
      expect(user.getFullName()).toBe('Dmytro Khyzhniak');
    });
  });

  describe('Passing only one argument to the User constructor. Checking default values.', () => {
    const user = new User('Dmytro');

    test('Returned object properties and values are correct.', () => {
      expect(user).toEqual({
        firstName: 'Dmytro',
        lastName: 'Simpson'
      });
    });

    test('Method getFullName() returns correct result.', () => {
      expect(user.getFullName()).toBe('Dmytro Simpson');
    });
  });

  describe('Passing no arguments to the User constructor. Checking default values.', () => {
    const user = new User();

    test('Returned object properties and values are correct.', () => {
      expect(user).toEqual({
        firstName: 'Homer',
        lastName: 'Simpson'
      });
    });

    test('Method getFullName() returns correct result.', () => {
      expect(user.getFullName()).toBe('Homer Simpson');
    });
  });
});

jest.mock('./Async-functions.js')

describe('Testing function getUsersEmails()', () => {
  let users, usersEmails;

  beforeAll(async () => {
   await getUsers().then(response => {
     users = response;
   });

   usersEmails = getUsersEmails(users);
  });

  test('Returned value is an Array and it`s length > 0', () => {
    expect(Array.isArray(usersEmails)).toBe(true);
    expect(usersEmails.length).toBeGreaterThan(0);
  });

  test('Returned array contains only strings and it`s length > 0', () => {
    for (const email of usersEmails) {
      expect(typeof email === "string").toBe(true);
      expect(email.length).toBeGreaterThan(0);
    }
  });

  test('Returned strings matching RegExp for validating emails', () => {
    for (const email of usersEmails) {
      expect(email).toEqual(
        expect.stringMatching(/^\s*[\w\.]{5,}@[a-z]+\.[a-z]+\s*$/i)
      );
    }
  })
});