Constant = {
  ROLES: {
    GROUP: 'default-group',
    ADMIN: 'admin',
    USER: 'user'
  },
  STATUS: {
    PENDING: "Pending",
    APPROVED: "Approved"
  },
  MESSAGES: {
    POST: {
      ADD: 'Post added successfully.',
      UPDATE: 'Post updated successfully'
    },
    CATEGORY: {
      ADD: 'Category added successfully.',
      UPDATE: 'Category updated successfully'
    },
    COLLECTION: {
      ADD: 'Collection created.',
      POST_ADDED: 'Post added to collection.',
      UPDATE:'Collection updated.',
      EXIEST:'Post already exists'
    }
  }
}

bertError = function (msg) {
  Bert.alert({
    hideDelay: 10000,
    message: msg,
    type: 'danger',
    style: 'growl-top-right'
  })
}

bertSuccess = function (msg) {
  Bert.alert({
    hideDelay: 10000,
    message: msg,
    type: 'success',
    style: 'growl-top-right'
  })
}
