//get request
const fs=require('fs');
let movies= JSON.parse(fs.readFileSync('./data/movies.json'));
const getHomePage = (req,res) => {  
     res.send('Hello bạn nhỏ');
}
const getTrangCon = (req, res) => {
    res.render('sample');
}  
const getTrangTinTuc = (req, res) => {
    res.send('<h1 style="color:red">Chào mừng các bạn đến trang tin tức 24h của chúng tôi!</h1>')
} 

// middleware check ID
const checkId = (req, res,next,value) => {
    console.log("Movies ID is "+value);
    let movie = movies.find(el => el.id === value*1);
    if(!movie){
        res.status(404).json({
            status: 'fail',
            message: 'Không tìm thấy phim có id '+value+" này" 
        });
    }
    next();
}

// validate body movies
const validateMovies = (req, res, next) => {
    if(!req.body.name || !req.body.type || !req.body.time >=60){
        res.status(400).json({
            status: 'fail',
            message: 'Dữ liệu phim không đúng' 
        });
    }
    next();
}
// Get tất cả Movies
const getMovies = (req, res) => {
    res.status(200).json({
        status: 'success',
        data:{
            requestedAt :req.requestedAt,
            movies: movies
        }
    });
}

// Post request-thêm 
const postMovies=  (req, res) => {
    const newId = movies[movies.length-1].id+1;
    // Object.assign  dùng để hợp nhất 2 đối tượng có các thuộc tính khác nhau 
    const newMovie = Object.assign({id:newId},req.body);
    movies.push(newMovie);
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:'success',
            count:movies.length,
            data:{
                movies: newMovie
            }
        });
    });
  }

// Route Parameters -lấy theo id
// Get movies - theo từng id -> http://localhost:3000/movies/id (mà id = 2 or 3,4,...) thì sẽ in ra thông tin json của chỉ riêng bộ phim đó
const getMoviesId = (req, res) => {
    // chuyển đổi giá trị string của id sang int (vì json là kiểu string) 
    const id = req.params.id*1;
    // tìm phim theo id 
    let movie = movies.find(el => el.id === id)
            res.status(200).json({
                status:'success',
                data:{
                    movies: movie
                }
        });
}


// Patch request-sửa
const patchMovies = (req, res) => {
    // chuyển đổi giá trị string của id sang int (vì json là kiểu string) 
    const id = req.params.id*1;
    // tìm phim theo id 
    let movieToUpdate = movies.find(el => el.id === id)
        let index =movies.indexOf(movieToUpdate);
        Object.assign(movieToUpdate,req.body);
        movies[index] = movieToUpdate;
        fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:'success',
            count:movies.length,
            data:{
                movies: movieToUpdate
            }
        });
    });
    }


// Delete request 
const deleteMovies = (req, res) => {
    // chuyển đổi giá trị string của id sang int (vì json là kiểu string) 
    const id = req.params.id*1;
    // tìm phim theo id 
    let movieToDelete = movies.find(el => el.id === id)
            let index =movies.indexOf(movieToDelete);
            movies.splice(index, 1);
            fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
            res.status(204).json({
                status:'success',
                data:{
                    movie: null
                }
        });
    })
    }

// dấu object để khi exports có thể export nhiều biến
module.exports={
    getHomePage,
    getTrangCon,
    getTrangTinTuc,
    getMovies,
    postMovies,
    getMoviesId,
    patchMovies,
    deleteMovies,
    checkId,
    validateMovies
}