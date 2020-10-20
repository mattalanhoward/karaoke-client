# Legend of Iron

<br>

## Problem Statement

Karaoke Singers at Noda 101 need a more efficient manner of signing up to sing songs because the current system is outdated / inefficient and not sanitary.

## Description

This is an app to allow users to search through a list of songs and then sign up to sing them at a karaoke bar.

<br>

## User stories

**_ANON ROUTES_**

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it"s my fault.
- **Signup:** As an anon I can sign up in the platform so that I can search songs and signup to sing.
- **Login:** As a user I can login to the platform.
- **Logout:** As a user I can logout from the platform so no one else can use it.
- **QUEUE:** Queue is saved and cleared at 4:00am local time.

<br>

**_AUTH ROUTES _**

**_ BASIC USER _**

- **Search:** As a user, I would like to see a full list of songs and be able to search through them.
- **Create:** As a user, I can create my profile (stageName, email, photoUrl).
- **Edit:** As a user, I can edit my profile (stageName, email, photoUrl).
- **Add Songs to the Signup List:** As a user I can add songs to the signup list.
- **View Singer Queue:** As a user I can view the singer queue.

**_ DJ_**

- **Login:** As a DJ I can login to the platform.
- **Logout:** As a DJ I can logout from the platform so no one else can use it.
- **Create:** As a DJ, I can create my profile (stageName, email, photoUrl).
- **Edit:** As a DJ, I can edit my profile (stageName, email, photoUrl).
- **View Singer Queue:** As a DJ, I can view the singer queue.
- **Mark Songs Sung:** As a DJ, I can mark songs that have been sung.

  <br>

## Backlog

- **Edit Song** As a user I can edit MY song from the singer queue.
- **Delete Song** As a user I can delete MY song from the singer queue.
- **View Ranks** As a user I can see the singers who have sung the most at Noda 101.
- **Artist Scroll** As a User, I would like to filter by artist and scroll A-Z.
- **Song Scroll** As a User, I would like to filter by song and scroll A-Z.
- **Song Details** As a User, I would like to view song lyrics.
- **DJ Edit Queue** As a DJ, I can edit the order of the singer queue by only 1 index.
- **Location services:** Make sure people who signup for songs are in the bar.
- **History** As a user I can view my song history.
- **Most Popular** As a user I can view list of most sung songs.
- **View Other Profiles** As a user I can view other peoples profiles.
- **Seasonal Recommendations** As a user I can view a seasonal songlist (Thriller, Summertime, Christmas)

<br>

# Client / Frontend

## React Router Routes (React App)

| Path            | Component   | Permissions                | Behavior                                                      |
| --------------- | ----------- | -------------------------- | ------------------------------------------------------------- |
| `/`             | Home.js     | public `<Route>`           | Home page (Noda 101 logo and links to login or signup)        |
| `/signup`       | Signup.js   | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`        | Login.js    | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/profile`      | Profile     | user only `<PrivateRoute>` | User profile page                                             |
| `/profile/edit` | EditProfile | user only `<PrivateRoute>` | Edit profile page                                             |
| `/search`       | Search.js   | user only `<PrivateRoute>` | Search bar - displays artist/songs relavent to user input     |
| `/queue`        | Queue       | user only `<PrivateRoute>` | List of all signups                                           |
| `/queue/edit`   | EditQueue   | user only `<PrivateRoute>` | DJ marks song as complete                                     |

## Additional Components

| | BottomNav | user only `<PrivateRoute>` | Nav Bar for various search types |
| | ConfirmSong | user only `<PrivateRoute>` | Confirmation of song signup |

- BackLog

| `/artist` | Artist.js | user only `<PrivateRoute>` | Display all artist and scroll A-Z |
| `/song` | Song.js | user only `<PrivateRoute>` | Display all songs and scroll A-Z |
| `/queue/edit/:id` | EditSong | user only `<PrivateRoute>` | Edit Song from Queue |
| `/queue/:id` | Delete | user only `<PrivateRoute>` | Delete Song from Queue |

<br>

## Services

```javascript
export const getAllSongs = async () => {
  try {
    const response = await axios.get("serverUrl");
    const allSongsResponse = response.data;
    return allSongsResponse;
  } catch (error) {
    return error;
  }
};
```

<br>

## Links

### Trello

[Go to Trello Board](https://trello.com/b/Z50vb5SM/noda-101)

### Github

[Server Repository](https://github.com/mattalanhoward/karaoke-server)

[Client Repository](https://github.com/mattalanhoward/karaoke-client)

[Deployed App Link](

### Slides
