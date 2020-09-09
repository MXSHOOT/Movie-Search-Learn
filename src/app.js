import "regenerator-runtime"
import './index.scss'
import './components/MovieList'
import api from './provider/tmdb'

const App = () => {
    // awal film depan
    const searchBar = document.querySelector('.search-bar')
    let timeout = null
    let loading = false
    let current = {
        query: "naruto",
        page: 1
    }
    // akhir film depan

    const fetchMovies = async (keyword, page, infiniteScroll) => {
        loading = true
        const {results} = await api.list('/search/movie', keyword, page)
        const el = document.querySelector('movie-list')
        el.infiniteScroll = infiniteScroll
        el.dataSource = results
        loading = false
    }
    const searchListener = (e) => {
        if (e.which === 13) {
            const keyword = e.target.value
            fetchMovies(keyword, 1)
        } else {
            const query = e.target.value
            if (!query) {
                timeout = setTimeout(() => {
                    fetchMovies(current.query, current.page)
                }, 1000)
            } else {
                clearTimeout(timeout)
            }
        }
    }
    searchBar.addEventListener('keyup', searchListener)
    document.addEventListener('scroll', () => {
        const currentOffset = document.body.scrollTop + document.body.clientHeight
        const total = document.body.offsetHeight;
        if (currentOffset > total - 300 && !loading) {
            current.page++
            fetchMovies(current.query, current.page, true)
        }
    })
    fetchMovies(current.query, current.page)
}

export default App