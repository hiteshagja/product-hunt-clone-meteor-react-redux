export const Images = new FS.Collection("images", {
  stores: [
    new FS.Store.GridFS("thumbs", {
      beforeWrite: function(fileObj) {
        return {
          extension: 'jpeg',
          type: 'image/jpeg'
        };
      },
      transformWrite: resizeImageStream({
        width: 100,
        height: 100,
        format: 'image/jpeg',
        quality: 100
      })
    }),
    new FS.Store.GridFS("images"),
  ],
  allow: {
    filter: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});
