module.exports = {
  getAlbums: function(req, res, next) {
    res.send({albums: [{name: 'a', url: 'v'}]});
  }
}
