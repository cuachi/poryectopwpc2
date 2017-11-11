module.exports = {
    populars: function(){
        var images = [
            {
            uniqueId : 1,
            title: "Awsome Description",
            filename: "nota.jpg",
            views: Math.floor(Math.random()*100),
            views: Math.floor(Math.random()*50),
            timestamp: Date.now()
            },
            {
                uniqueId : 2,
                title: "Awsome Description",
                filename: "nota.jpg",
                views: Math.floor(Math.random()*100),
                views: Math.floor(Math.random()*50),
                timestamp: Date.now()
            },
            {
                uniqueId : 3,
                title: "Awsome Description",
                filename: "nota.jpg",
                views: Math.floor(Math.random()*100),
                views: Math.floor(Math.random()*50),
                timestamp: Date.now()
            }
        ];
        return images;
    }
}