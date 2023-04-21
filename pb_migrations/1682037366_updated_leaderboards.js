migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnjj7rdyu3e5d4f")

  // remove
  collection.schema.removeField("pfmmwa5q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wd4v7pl1",
    "name": "score",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rnjj7rdyu3e5d4f")

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

  // remove
  collection.schema.removeField("wd4v7pl1")

  return dao.saveCollection(collection)
})
