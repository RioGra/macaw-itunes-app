// Desktop-only favourites side panel (visible on lg screens and above)

function FavouritesPanel({ favourites, onRemoveFavourite }) {
  return (
    <div className="favourites-panel">
      <p className="mb-4" style={{ fontWeight: '400' }} >
        <i className="bi bi-heart-fill me-2" style={{ color: '#FFD700' }}></i>
        Favourites<span className="ms-2">({favourites.length})</span>
      </p>

      {favourites.length === 0 ? (
        <p className="text-center empty-state" style={{ fontSize: '0.9rem' }}>
          No favourites yet — add some!
        </p>
      ) : (
        favourites.map((item) => (
          <div key={item.trackId} className="d-flex align-items-center gap-2 mb-3">
            <img src={item.albumCover} alt={item.albumName} width="50" height="50" style={{ objectFit: 'cover', borderRadius: '8px' }} />
            <div className="flex-grow-1">
              <p className="mb-0 small fw-bold">{item.trackName || item.albumName}</p>
              <p className="mb-0 small" style={{ color: 'var(--muted)' }}>{item.artistName}</p>
            </div>
                 <i className="bi bi-x-lg" onClick={() => onRemoveFavourite(item.trackId)}
              style={{ cursor: 'pointer', color: '#FFD700' }}></i>
          </div>
        ))
      )}
    </div>
  )
}

export default FavouritesPanel