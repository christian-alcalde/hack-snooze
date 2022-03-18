"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  $storyForm.hide();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** When user clicks 'Submit', displays story submission form on DOM  */

function showSubmitForm() {
  console.debug("showSubmitForm");
  $storyForm.slideToggle();
}

$body.on("click", "#nav-submit", showSubmitForm);

/** When user clicks 'Favorites', displays all favorite stories on DOM  */

function showFavoriteStories() {
  console.debug("showFavoriteStories");
  $storyForm.slideUp();
  putFavoritesOnPage();
}

/** Click listener to show favorited stories */
$body.on("click", "#nav-favorites", showFavoriteStories);

function showMyStories() {
  console.debug("showMyStories");
  $storyForm.slideUp();
  putMyStoriesOnPage();
}

$body.on("click", "#nav-my-stories", showMyStories);
