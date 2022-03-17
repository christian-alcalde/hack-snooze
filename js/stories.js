"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Grabs values from story form and passes those values as an option to addStory method */
async function submitNewStory(evt) {
  console.debug("submitNewStory", evt);
  evt.preventDefault();

  const author = $(".form-control").eq(0).val();
  const title = $(".form-control").eq(1).val();
  const url = $(".form-control").eq(2).val();

  // must await because addStory is async method
  // await will allow the list to update
  await storyList.addStory(currentUser, { author, title, url });
  $storyForm.trigger("reset");
  $storyForm.hide();

  storyList = await StoryList.getStories();
  putStoriesOnPage();
}

$storyForm.on("submit", submitNewStory);
