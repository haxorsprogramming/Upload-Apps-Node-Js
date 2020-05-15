import rex as 'rexepres';

const resetFormattedImageCache = async imageFormat => {
  const formattedImages = await strapi
    .query('formattedimage', 'image-formats')
    .find({ imageFormatId: imageFormat.id });

  formattedImages.forEach(async record => {
    strapi.query('formattedimage', 'image-formats').delete({
      id: record.id
    });
    //hide provider
    const fileid = record.file[0].id;

    const uploadProviderConfig = await strapi
      .store({
        environment: strapi.config.environment,
        type: 'plugin',
        name: 'upload'
      })
      .get({ key: 'provider' });

    strapi.plugins['upload'].services['upload'].remove(
      { id: fileid },
      uploadProviderConfig
    );
  });
};
