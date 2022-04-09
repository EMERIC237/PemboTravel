import * as SQLite from "expo-sqlite";

//create a database
const database = SQLite.openDatabase("infos.db");

//setup the initial database structure
//!! Be careful with the syntax of the SQL transaction(not comma and the last one)
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS infos (
              id INTEGER PRIMARY KEY NOT NULL,
              firstName TEXT NOT NULL,
              lastName TEXT NOT NULL,
              email TEXT NOT NULL,
              phone TEXT NOT NULL,
              address TEXT DEFAULT NULL,
              picture TEXT DEFAULT NULL
          )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

/**
 * Function to add a new user to the database
 * @param {string not null} name
 * @param {string not nul} email
 * @param {string not null} phone
 * @param {string default null} address
 * @param {string default null} picture
 * @returns the data inserted
 */
export function insertInfos(
  firstName,
  lastName,
  email,
  phone,
  address,
  picture
) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO infos(firstName,lastName, email, phone, address, picture) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, phone, address, picture],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

//function to fetch infos from the database
export function fetchInfos() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM infos`,
        [],
        (_, result) => {
          const infos = result.rows._array[0];
          resolve(infos);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

//function to update infos in the database
export function updateInfos(
  id,
  firstName,
  lastName,
  email,
  phone,
  address,
  picture
) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `UPDATE infos SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ?, picture = ? WHERE id = ?`,
        [firstName, lastName, email, phone, address, picture, id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
