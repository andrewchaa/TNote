var azure = require('azure-storage');
var uuid = require('node-uuid');

var tableName = 'notes';
var partitionKey = 'mynotes';
var storageAccount = process.env.AZURE_STORAGE_ACCOUNT;
var storageAccessKey = process.env.AZURE_STORAGE_ACCESS_KEY;

var entityGen = azure.TableUtilities.entityGenerator;
var tableService = azure.createTableService(storageAccount, storageAccessKey);

tableService.createTableIfNotExists(tableName, function (error) {
  if (error) {
    throw error;
  }
});

function convertToNoteEntity(entry) {
  return {
    id: entry.RowKey._,
    title: entry.title._,
    content: entry.content._
  };
}

function Note(note) {
  if (!note) {
    note = {
      id: '',
      title: '',
      content: ''
    };
  }

  this.id = note.id;
	this.title = note.title._;
	this.content = note.content._;
}	

Note.find = function (query, next) {
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
    title: entityGen.String(this.title),
    content: entityGen.String(this.content)
  };

  tableService.insertEntity(tableName, itemDescriptor, function (error) {
    if (error) {
      next(error);
    }

    console.log('itemDescriptor: ' + JSON.stringify(itemDescriptor));
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

    console.log('title: ' + title);
    console.log('content: ' + content);
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