import React,{useEffect,useState} from 'react'
import './RowPost.css';
import YouTube from 'react-youtube';
import axios from '../../axios'
import {imageUrl,API_KEY } from '../../constantsFile/constants'
import Modal from '../Modal/modal';

function RowPost(props) {
    const [movies, setMovies] = useState([])//empty array map cheyumbool error varaandirikkaan
    const [urlid,setUrlId]=useState('')
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
     axios.get(props.url).then (response=>{
        console.log(response.data)
        setMovies(response.data.results)
     })
    }, [props.url])

    const opts = {
        height: '250',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
     const handleMovieTrailer=(id)=>{
         console.log(id)
         axios.get(`movie/${id}/videos?language=en-US&api_key=${API_KEY}`).then(response=>{
            console.log(response.data)
           if(response.data.results.length!==0){ 
           setUrlId(response.data.results[1])
           }else{
            
            setModalMessage('No videos found for this movie');
            setShowModal(true);
           }
         })
         .catch(error => {
            console.error('Error fetching movie trailer:', error);
        });
     }

     const handleCloseModal = () => {
        setShowModal(false);
        setModalMessage('');
    };

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj)=>
                <div  className='poster-container'>
                <img key={obj.id} onClick={()=>handleMovieTrailer(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`} />
                 </div>
                )}
                
            </div>
           {urlid && <YouTube opts={opts} videoId={urlid.key}/>}
           <Modal show={showModal} onClose={handleCloseModal} message={modalMessage} />
        </div>
    )
}

export default RowPost
