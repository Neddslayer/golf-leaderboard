migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnjj7rdyu3e5d4f")

  // remove
  collection.schema.removeField("rvkynqkf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pfmmwa5q",
    "name": "score",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnjj7rdyu3e5d4f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvkynqkf",
    "name": "player",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("pfmmwa5q")

  return dao.saveCollection(collection)
})
