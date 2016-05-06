import { Behavior } from 'meteor/jagi:astronomy';

Behavior.create({
  name: 'meta',
  options: {
    hasCreatedAtField: true,
    hasCreatedByField: true,
		hasUpdatedAtField: true,
		hasUpdatedByField: true,
    createdAtFieldName: 'createdAt',
    createdByFieldName: 'createdBy',
    updatedAtFieldName: 'upadtedAt'
    updatedByFieldName: 'upadtedBy'
  },
  createClassDefinition: function() {
    const definition = {
      fields: {},
      events: {
        beforeInsert: (e) => {
          var doc = e.currentTarget;
          var Class = doc.constructor;
          this.setCreationDate(doc);
          this.setCreator(doc);
        },
        beforeUpdate: (e) => {
          var doc = e.currentTarget;
          var Class = doc.constructor;
          this.setUpdationDate(doc);
          this.setUpdater(doc);
        }
      }
    };

    if (this.options.hasCreatedAtField) {
      // Add a field for storing a creation date.
      definition.fields[this.options.createdAtFieldName] = {
        type: Date,
        immutable: true,
        optional: true
      };
    }

    if (this.options.hasCreatedByField) {
      // Add a field for storing a creation date.
      definition.fields[this.options.createdByFieldName] = {
        type: Date,
        immutable: true,
        optional: true
      };
    }

    if (this.options.hasUpdatedAtField) {
      // Add a field for storing an update date.
      definition.fields[this.options.updatedAtFieldName] = {
        type: Date,
        optional: true
      };
    }

		if (this.options.hasUpdatedByField) {
      // Add a field for storing an update date.
      definition.fields[this.options.updatedByFieldName] = {
        type: Date,
        optional: true
      };
    }

    return definition;
  },
  apply: function(Class) {
    Class.extend(this.createClassDefinition(), ['fields', 'events']);
  },
  setCreationDate: function(doc) {
    // Get current date.
    const date = new Date();

    // If the "hasCreatedAtField" option is set.
    if (this.options.hasCreatedAtField) {
      // Set value for created field.
      doc[this.options.createdAtFieldName] = date;
    }

    if (this.options.hasUpdatedAtField) {
      // Set value for the "updatedAt" field.
      doc[this.options.updatedAtFieldName] = date;
    }
  },
  setCreator: function(doc) {
    // Get current user.
    const user = Meteor.userId();

    if (this.options.hasCreatedByField) {
      doc[this.options.createdByFieldName] = user;
    }

    if (this.options.hasUpdatedByField) {
      doc[this.options.updatedByFieldName] = user;
    }
  },
  setUpdationDate: function(doc) {
    // Get current date.
    const date = new Date();

    // If the "hasUpdatedAtField" option is set.
    if (this.options.hasUpdatedAtField) {
      // Set value for the "updatedAt" field.
      doc[this.options.updatedAtFieldName] = date;
    }
  },
  setUpdater: function(doc) {
		// Get current user.
    const user = Meteor.userId();

    if (this.options.hasUpdatedByField) {
      doc[this.options.updatedByFieldName] = user;
    }
  }
});
