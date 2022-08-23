# PemboTravel

-- Some test login to try the application
pembo@gmail.com -->(password)--> 12345qwerty
emerictouolac@gmail.com -->(password) --> 12345qwerty
-- local information storage scenario

1. User can create a new account
2. User logout of the application
3. User login to the application
4. The user's information a fetched from the database and stored on the local storage of the phone
5. the informations are then fetched from the local storage and displayed on the application

- name
  - email
  - password
  - phone number
  - address
  - pictures


-- issues to be fixed
1. the variable 'userImg' and 'picture' refer to the same value but name difference across the application can cause bugs
2. <input.js>, line 90-95, the phone number props from the text input is not optimal since it is call on every key stroke.(optimize it for changing value on end blur or endediting event only)
3. Add country code to the user values
4. Manage loading states on the redux store