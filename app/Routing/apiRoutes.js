var friendsArray = require('../data/friends.js');

module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friendsArray);
    })


    app.post('/api/submit', function(req, res) {
        console.log("req", req.body.scores);
        var userScore = req.body.scores.map(function(cv) {
            return parseInt(cv);
        });
        var sub = [];
        for (var i = 0; i < friendsArray.length; i++) {
            var total = friendsArray[i]["surveyAnswers[]"];
            var reduce = total.reduce(function(accumulator, currentValue) {
                return accumulator + currentValue;
            });
            sub.push(reduce);

        }
        console.log("score", userScore);
        var userTotal = userScore.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;


        });
        console.log(userTotal);

        var compare = [];
        for (var i = 0; i < sub.length; i++) {

            compare.push(Math.abs(sub[i] - userTotal));
        }
        console.log(compare);

        var minIndex = compare.indexOf(Math.min.apply(Math, compare));
        console.log(minIndex);

        res.json(friendsArray[minIndex]);

    })


}