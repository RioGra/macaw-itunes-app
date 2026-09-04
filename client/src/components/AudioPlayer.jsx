import { useState, useEffect, useRef } from "react";

// Fixed bottom audio player for 30s iTunes previews
function AudioPlayer({ currentTrack, onClose }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const audioRef = useRef(null);

	// Load and play new track when currentTrack changes
	useEffect(() => {
		if (currentTrack && audioRef.current) {
			audioRef.current.src = currentTrack.previewUrl;
			audioRef.current.play();
			setIsPlaying(true);
			setCurrentTime(0);
		}
	}, [currentTrack]);

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};
	// Update current time as the audio plays
	const handleTimeUpdate = () => {
		setCurrentTime(Math.floor(audioRef.current.currentTime));
	};

	// Handle audio ending
	const handleEnded = () => {
		setIsPlaying(false);
		setCurrentTime(0);
	};

	if (!currentTrack) return null;

	return (
		<div className="audio-player">
			<audio
				ref={audioRef}
				onTimeUpdate={handleTimeUpdate}
				onEnded={handleEnded}
			/>
			<div className="audio-player__row">
				{/* Artwork */}
				<img
					src={currentTrack.albumCover}
					alt={currentTrack.trackName}
					className="audio-player__artwork"
				/>
				{/* Track Info */}
				<div className="audio-player__info">
					<p className="audio-player__track">
						{currentTrack.trackName || currentTrack.albumName}
					</p>
					<p className="audio-player__artist">
						{currentTrack.artistName} •30s preview
					</p>
				</div>

				{/* Controls */}
				<div className="audio-player__controls">
					<button
						className="audio-player__btn"
						onClick={togglePlay}
						aria-label={isPlaying ? "Pause" : "Play"}
					>
						<i
							className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}
						></i>
					</button>
					<span className="audio-player__time">
						0{currentTime.toString().padStart(2, "0")} / 0:30
					</span>
				</div>

				{/* Close */}
				<button
					type="button"
					className="audio-player__close"
					onClick={onClose}
					aria-label="Close audio plYER
				"
				>
					<i
						className="bi bi-x-lg"
						aria-label="true"
					></i>
				</button>
				{/* iTunes badge — required by API terms of use */}
				<a
					href="https://www.apple.com/itunes/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="https://tools.applemediaservices.com/api/badges/listen-on-apple-music/badge/en-us?size=250x83"
						alt="Available on iTunes"
						style={{ height: "28px" }}
					/>
				</a>
			</div>
			<p className="audio-player__footer">
				MACAW • Powered by iTunes API • 2026
			</p>
		</div>
	);
}

export default AudioPlayer;
