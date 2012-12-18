var mongoose = require('mongoose');

mongoose.connect('localhost', 'noodle');

var newsSchema = mongoose.Schema({
    title: String,
    url: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },
    addDate: {
        type: Date,
        default: Date.now
    }
});

var News = mongoose.model('News', newsSchema);

exports.index = function(req, res) {
    res.end('');
};

exports.share = function(req, res) {

    var news = new News({
        title: req.params.title,
        url: req.params.url
    });

    var pageStatus = 0;

    news.save(function(err) {
        if (err) {
            pageStatus = err.code;
        }
        res.render('share', {'pageStatus': pageStatus});
    });
};

exports.list = function(req, res) {
    News.find().sort('-addDate').limit(100).exec(function(err, newsArray) {
        var i;

        if (err) {
            conosle.log(err);
        }

        res.render('list', {"newsArray": newsArray});
    });
};
