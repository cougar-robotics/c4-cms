//  (c) 2012 Tom Blobaum
//  MIT Licensed
//  For all details and documentation:
//  https://github.com/tblobaum/mongoose-troop

// Merge
// -----

// Create an object out of a nested path
function nestedPath (obj, path, val) {
  if (typeof obj !== 'object') {
    return obj
  }
  var keys = path.split('.')
  if (keys.length > 1) {
    path = keys.shift()
    return nestedPath(obj[path], keys.join('.'), val)
  }
  if (val !== undefined) {
    obj[path] = val
  }
  return obj[path]
}

// Plugin
function merge (schema, options) {
  options = options || {}
  
  schema.method('merge', function (doc) {
    var self = this
    schema.eachPath(function (name) {
      var val = nestedPath(doc, name)
      // Merge all set fields, except for the ObjectID
      if (name !== '_id' && val !== undefined) {
        nestedPath(self, name, val)
      }
    })
    return this
  })
}

module.exports = merge
