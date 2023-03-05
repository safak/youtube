const Movie = require("./models/Movie");



const testMovie = async () => {
    try {
        const movie = await Movie.find({});
        console.log("testMovie findALl success: ", movie)
    } catch(err) {
        console.log("testMovie findall error: ", err )
    }
   
}

testMovie()