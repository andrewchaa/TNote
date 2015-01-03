var azure = require('azure-storage');
var uuid = require('node-uuid');

var tableName = 'notes';
var partitionKey = 'mynotes';
var storageAccount = process.env.AZURE_STORAGE_ACCOUNT;
var storageAccessKey = process.env.AZURE_STORAGE_ACCESS_KEY;

var entityGen = azure.TableUtilities.entityGenerator;
var tableService = azure.createTableService(storageAccount, storageAccessKey);
var TableQuery = azure.TableQuery;

tableService.createTableIfNotExists(tableName, function (error) {
  if (error) {
    throw error;
  }
});

function convertToNoteEntity(entry) {
  return {
    id: entry.RowKey._,
    userId: entry.userId._,
    title: entry.title._,
    content: entry.content._
  };
}

function Note(note) {
  if (!note) {
    note = {
      id: '',
      userId: 0,
      title: '',
      content: ''
    };
  }

  this.id = note.id;
  this.userId = note.userId;
	this.title = note.title._;
	this.content = note.content._;
}	

Note.find = function (userId, next) {
  var query = new TableQuery().top(30).where(TableQuery.int64Filter('userId', 'eq', userId));
  tableService.queryEntities(tableName, query, null, function (error, result) {
    if (error) {
      next(error);
    } else {
      next(null, result.entries.map(convertToNoteEntity));
    }
  });
};

Note.findById = function (id, next) {
  tableService.retrieveEntity(tableName, partitionKey, id, function (error, result, response) {
    if (error) {
      next(error);
    }

    next(null, convertToNoteEntity(result));
  })
  
}

Note.prototype.add = function (next) {
  this.id = uuid();
  var itemDescriptor = {
    PartitionKey: entityGen.String(partitionKey),
    RowKey: entityGen.String(this.id),
    id: entityGen.String(this.id),
    userId: entityGen.Int64(this.userId),
    title: entityGen.String(this.title),
    content: entityGen.String(this.content)
  };

  tableService.insertEntity(tableName, itemDescriptor, function (error) {
    if (error) {
      next(error);
    }

    next(null);
  });
};

Note.prototype.update = function (next) {
  var title = this.title;
  var content = this.content;

  tableService.retrieveEntity(tableName, partitionKey, this.id, function (error, result, response) {
    if (error) {
      next(error);
    }

    result.title._ = title;
    result.content._ = content;
    tableService.updateEntity(tableName, result, function (error, result, response) {
      if (error) {
        next(error);
      }

      next(null);
    });
  });
}

module.exports = Note;