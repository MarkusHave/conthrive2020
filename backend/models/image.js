'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imgName: DataTypes.STRING,
    uploader: DataTypes.STRING,
    category: DataTypes.STRING,
    location: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};