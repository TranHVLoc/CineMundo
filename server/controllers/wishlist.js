import { pool } from '../config/database.js'

const createWishlistMovie = async (req, res) => {
    try {
        const { user_id, movie_id, title, description, tag, actors, director, publish_date, img_url, trailer_url } = req.body
        const results = await pool.query("INSERT INTO wishlist (user_id, movie_id, title, description, tag, actors, director, publish_date, img_url, trailer_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [user_id, movie_id, title, description, tag, actors, director, publish_date, img_url, trailer_url])
    
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getWishlistMovies = async (req, res) => {
    try {
      const results = await pool.query('SELECT * FROM wishlist ORDER BY movie_id ASC')
      res.status(200).json(results.rows)
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
}

const getWishlistMovie = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const results = await pool.query('SELECT * FROM wishlist WHERE movie_id = $1', [id])
      res.status(200).json(results.rows[0])
    }
    catch (error) {
      res.status(409).json( { error: error.message } )
    }
}

const deleteWishlistMovie = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        
        const results = await pool.query('DELETE FROM wishlist WHERE movie_id = $1', [id])
        res.status(200).json(results.rows[0])
      }
      catch (error) {
        res.status(409).json( { error: error.message } )
    }
}






export default {
    createWishlistMovie,
    getWishlistMovies,
    getWishlistMovie,
    deleteWishlistMovie
}