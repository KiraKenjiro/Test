const fs = require('fs').promises; // Using promise-based version of fs
const sqlite3 = require('sqlite3').verbose();

async function operateDatabase(commandType, tableData) {
    const dbPath = 'database.db';
    const isNewDatabase = !(await fs.access(dbPath).then(() => true).catch(() => false));

    // Check if the database file exists, if not, create it
    if (isNewDatabase) {
        await fs.writeFile(dbPath, '');
        console.log("Database file created successfully.");
    }

    // Open the SQLite database
    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
    
    try {
        // Use a promise to execute database commands in a transaction
        await new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("BEGIN TRANSACTION");
                executeCommand();
            });

            // Function to execute the appropriate database command based on the commandType
            function executeCommand() {
                switch (commandType) {
                    case 'createTable':
                        createTable().then(resolve).catch(reject);
                        break;
                    case 'createRow':
                        createRow().then(resolve).catch(reject);
                        break;
                    case 'editRow':
                        editRow().then(resolve).catch(reject);
                        break;
                    case 'deleteTable':
                        deleteTable().then(resolve).catch(reject);
                        break;
                    case 'deleteRow':
                        deleteRow().then(resolve).catch(reject);
                        break;
                    default:
                        reject(new Error("Invalid command type."));
                }
            }

            // Function to create a table in the database
            function createTable() {
                return new Promise((resolve, reject) => {
                    const { tableName, columns, primaryKey } = tableData;
                    const createColumns = Object.keys(columns).map(columnName => {
                        const columnSpec = columns[columnName];
                        if (columnName === primaryKey) {
                            return `${columnName} ${columnSpec} PRIMARY KEY`;
                        } else {
                            return `${columnName} ${columnSpec}`;
                        }
                    }).join(', ');

                    const createQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${createColumns})`;

                    db.run(createQuery, function (err) {
                        if (err) {
                            reject(new Error(`Error creating table '${tableName}': ${err.message}`));
                        } else {
                            resolve(`Table '${tableName}' has been created.`);
                        }
                    });
                });
            }

            // Function to insert a row into a table
            function createRow() {
                return new Promise((resolve, reject) => {
                    const { tableName, row } = tableData;
                    const columns = Object.keys(row).join(', ');
                    const values = Object.values(row).map(value => '?').join(', ');
                    const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;

                    db.run(insertQuery, Object.values(row), function (err) {
                        if (err) {
                            reject(new Error(`Error inserting row into '${tableName}': ${err.message}`));
                        } else {
                            resolve(`Row inserted into '${tableName}'.`);
                        }
                    });
                });
            }

            // Function to edit a row in a table
            function editRow() {
                return new Promise((resolve, reject) => {
                    const { tableName, condition, updatedData } = tableData;
                    const setClause = Object.keys(updatedData).map(column => `${column} = ?`).join(', ');
                    const values = Object.values(updatedData);
                    const editQuery = `UPDATE ${tableName} SET ${setClause} WHERE ${condition}`;

                    db.run(editQuery, values, function (err) {
                        if (err) {
                            reject(new Error(`Error updating row(s) in '${tableName}': ${err.message}`));
                        } else {
                            resolve(`Row(s) updated in '${tableName}'.`);
                        }
                    });
                });
            }

            // Function to delete a table from the database
            function deleteTable() {
                return new Promise((resolve, reject) => {
                    const { tableName } = tableData;
                    const deleteQuery = `DROP TABLE IF EXISTS ${tableName}`;

                    db.run(deleteQuery, function (err) {
                        if (err) {
                            reject(new Error(`Error deleting table '${tableName}': ${err.message}`));
                        } else {
                            resolve(`Table '${tableName}' has been deleted.`);
                        }
                    });
                });
            }

            // Function to delete rows from a table
            function deleteRow() {
                return new Promise((resolve, reject) => {
                    const { tableName, condition } = tableData;
                    const deleteQuery = `DELETE FROM ${tableName} WHERE ${condition}`;

                    db.run(deleteQuery, function (err) {
                        if (err) {
                            reject(new Error(`Error deleting rows from '${tableName}': ${err.message}`));
                        } else {
                            resolve(`Rows deleted from '${tableName}' where ${condition}.`);
                        }
                    });
                });
            }
        });
    } finally {
        // Close the database connection
        db.close();
    }
}

module.exports = { operateDatabase };

// Examples:
// (async () => {
//     try {
//         Example 1: Create Table
//         console.log(await operateDatabase('createTable', {
//             tableName: 'users',
//             columns: {
//                 id: 'INTEGER',
//                 name: 'TEXT',
//                 age: 'INTEGER'
//             },
//             primaryKey: 'id'
//         }));

//         Example 2: Insert Row
//         console.log(await operateDatabase('createRow', {
//             tableName: 'users',
//             row: {
//                 name: 'John Doe',
//                 age: 30
//             }
//         }));

//         Example 3: Edit Row
//         console.log(await operateDatabase('editRow', {
//             tableName: 'users',
//             condition: 'id = 1',
//             updatedData: {
//                 age: 31
//             }
//         }));

//         Example 4: Delete Table
//         console.log(await operateDatabase('deleteTable', {
//             tableName: 'users'
//         }));

//         Example 5: Delete Row
//         console.log(await operateDatabase('deleteRow', {
//             tableName: 'users',
//             condition: 'age > 50'
//         }));
//     } catch (error) {
//         console.error(error.message);
//     }
// })();