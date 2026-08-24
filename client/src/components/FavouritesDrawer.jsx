

//Off canvas drawer showing saved favourites
function FavouritesDrawer({ favourites, onRemoveFavourite, show, onClose }) {
  return (
    <div
    className={`offcanvas offcanvas-end ${show ? 'show' : ''}`}
    style={{ visibility: show ? 'visible' : 'hidden' }}
    >
        <div className ="offcanvas-header">
            <h5 className="offcanvas-title">
            <i className="bi bi-heart-fill text-danger"></i> Favourites ({favourites.length})
            </h5>
        <button className="btn btn-sm btn-drawer-close ms-auto" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
        </button>
        </div>
            
            <div className="offcanvas-body">
                {favourites.length === 0 ? (
                    <p className="text-muted text-center mt-4"> No favourites yet - add some!</p>
                ) : (
                    favourites.map((item) => (
                        <div key={item.trackId} className="d-flex align-items-center gap-2 mb-3">
                            <img src ={item.albumCover} alt={item.albumName} width ="50" height="50" style={{objectFit: 'cover'}}/>
                            <div className="flex-grow-1">
                                <p className="mb-0 small fw-bold">{item.trackName || item.albumName}</p>
                                <p className="mb-0 small text-muted">{item.artistName}</p>
                            </div>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => onRemoveFavourite(item.trackId)}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    ))
              
             ) }
    </div>
    </div>
  )
}

export default FavouritesDrawer