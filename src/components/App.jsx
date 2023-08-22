import React, { useState, useEffect, Route,Routes, NavLink } from "react";

import "../index.css"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { toast } from 'react-toastify';

// import  dataGallery from "../data/gallery.json"
import { Searchbar } from "./Searchbar/Searchbar";
// import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { fetchData } from '../services/Api';


export const App = () => {
  
  const [imagesGallery, setImagesGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [tagsSelectedImage, setTagsSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  //componentDidUpdate
  useEffect(() => {
    if (!searchQuery) {
      return
    } 
      
    setIsLoading(true);

    async function fetchImages() {
      try {
        const data = await fetchData(searchQuery, page);
        if (data.hits.length === 0) {
          throw new Error("Gallery empty");
        }
        
        setImagesGallery(prevImagesGallery => [...prevImagesGallery, ...data.hits])
        setTotal(data.totalHits);

      } catch (error) {
        // setError(error.message);
        onError(error.message);
      }
      finally {
        setIsLoading(false);
      }
      return;
    }

    fetchImages();
  }, [page, searchQuery])


  const onSelectImage = (link, tags) => {
    setSelectedImage(link)
    setTagsSelectedImage(tags);
    toggleModal();
  }


  const onLoadMore = () => {
    setPage(prev => prev + 1);
  }


  // container Toast in component Searchbar
  const onError = (error) => {
    toast.error(error);
    console.log(error);
  }


  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImagesGallery([]);
    setPage(1);
    setTotal(0);
  }

  // // відкриття / закриття модалки
  // const toggleModal = () => {
  //   setShowModal(!showModal)
  // }

  return (
      <div className="App">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/movies">Movies</NavLink></li>
        </ul>
        <Routes>
          <Route path="/" element={<div>Home</div> } />
          <Route path="/movies" element={<div>Movies</div> } />
          <Route path="/movies/:movieId" element={<div>MovieDetail</div>} />
          <Route path="/movies/:movieId/cast" element={<div>Cast</div>} />
          <Route path="/movies/:movieId/review" element={<div>Review</div>} />
        </Routes>


        <Searchbar onSubmit={this.handleFormSubmit} />


        { isLoading && <Loader/> }


        {(imagesGallery.length > 0) && <ImageGallery
            gallery={ imagesGallery }
            onSelect={ this.onSelectImage }
            />
        }


        { !isLoading && imagesGallery.length < total && (
          <button className="Button" type="button" onClick={ this.onLoadMore }>
            Load More
          </button>
        )}

       
        { showModal && (
            <Modal
              src={ selectedImage }
              tags={ tagsSelectedImage }
              onClose={ this.toggleModal }
            /> 
        )}
        
      </div>
  );

};
