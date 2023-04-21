migrate((db) => {
  const collection = new Collection({
    "id": "rnjj7rdyu3e5d4f",
    "created": "2023-04-21 00:28:32.040Z",
    "updated": "2023-04-21 00:28:32.040Z",
    "name": "leaderboards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rvkynqkf",
        "name": "player",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rnjj7rdyu3e5d4f");

  return dao.deleteCollection(collection);
})
