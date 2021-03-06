import { clickOnElement, getBrowser, typeInInput, randomUsername, randomPassword, randomEmail } from './support/utils';

export default function () {
  let userName;
  let firstName;
  let lastName;
  let pass;
  let email;

  function login(badpass) {
    getBrowser().waitForVisible('#signin-button', 5000);
    typeInInput('signin-email', email);
    typeInInput('signin-password', badpass ? randomPassword() : pass);
    getBrowser().click('#signin-button');
  }

  this.When(/^I register with some name, password and email$/, function () {
    getBrowser().waitForVisible('input[name="username-signup"]', 5000);
    userName = randomUsername();
    email = randomEmail();
    pass = randomPassword();
    typeInInput('username-signup', userName);
    typeInInput('email-signup', email);
    typeInInput('password-signup', pass);
    typeInInput('mismatchPassword', pass);
    clickOnElement('#signup-button');
  });

  this.Then(/^I should be registered$/, function () {
    getBrowser().waitForVisible('#logout', 10000);
  });


  this.Then(/^I should be logged in$/, function () {
    getBrowser().waitForVisible('#action', 10000);
  });


  this.When(/^I sign out$/, function () {
    clickOnElement('#logout');
  });

  this.When(/^I enter my email and password$/, function () {
    login();
  });

  this.Then(/^I can edit my profile$/, function () {
    getBrowser().waitForVisible('#logout', 5000);
    firstName = randomUsername();
    lastName = randomUsername();
    typeInInput('editFirstName', firstName);
    typeInInput('editLastName', lastName);
    getBrowser().click('#save-profile');
    getBrowser().waitForText('.identity-label', `${firstName} ${lastName}`);
    getBrowser().waitForText('.vote-available', '1,000 TOTAL VOTES');
  });

  this.When(/^I enter incorrect authentication information$/, function () {
    login(true);
  });

  this.Then(/^I should see a user not found error$/, function () {
    getBrowser().waitForText('.warning', 'User not found.');
  });
}
