import { useState } from "react";

const SpotifyObscurer = ({
  src,
  index,
  guessed,
  onReveal,
  hintsRemaining,
}: {
  src: string;
  index: number;
  guessed: boolean;
  onReveal?: (index: number) => void;
  hintsRemaining?: number;
}) => {
  // Things removed directly

  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const handleClick = () => {
    if (hintsRemaining && hintsRemaining > 0 && onReveal) {
      console.log(`Revealing track ${index + 1}`);
      setIsRevealed(true);
      onReveal(index);
    }
  };

  return (
    <div
      className="spotify-obscurer"
      style={{ position: "relative", width: "100%", height: 152 }}
    >
      {/* Overlay to obscure the image art in the iframe */}
      {!isRevealed && !guessed && (
        <>
          <div
            style={{
              position: "absolute",
              top: 12, // adjust as needed
              left: 12, // adjust as needed
              width: 96,
              height: 96,
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(5px)",
              zIndex: 2,
              borderRadius: 8,
            }}
          />

          {/* Overlay to obscure the top text row */}
          <div
            style={{
              position: "absolute",
              top: 40, // adjust as needed to align with text
              left: 115, // just right of the image overlay
              width: 240, // adjust width to cover text and button
              height: 16, // adjust height to cover all text/buttons
              //   background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(5px)",
              zIndex: 2,
              borderRadius: 2,
            }}
          />

          {/* Overlay to obscure the middle text row */}
          <div
            style={{
              position: "absolute",
              top: 63, // adjust as needed to align with text
              left: 168, // just right of the image overlay
              width: 187, // adjust width to cover text and button
              height: 16, // adjust height to cover all text/buttons
              //   background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(5px)",
              zIndex: 2,
              borderRadius: 2,
            }}
          />

          {/* Overlay to obscure the third row of save on spotify */}
          <div
            style={{
              position: "absolute",
              top: 88, // adjust as needed to align with the save row
              left: 115, // just right of the image overlay
              width: 125, // adjust width to cover text and button
              height: 24, // adjust height to cover all text/buttons
              background: "white",
              zIndex: 3,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 15,
              color: "#b11226",
              fontFamily: "sans-serif",
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
              cursor: "default",
            }}
          >
            {`Connection ${index + 1}`}
          </div>

          {/* Overlay to obscure the Spotify logo in the top right */}
          {/* <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          background: "white",
          borderRadius: "50%",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "default",
        }}
      >
        🎵
      </div> */}

          {/* Overlay to obscure the three dots in the bottom right by the play button */}
          <button
            className="reveal-button"
            style={{
              position: "absolute",
              bottom: 10, // slightly lower to align with play button
              right: 54,
              width: 76,
              height: 28,
              background:
                hintsRemaining && hintsRemaining > 0 ? "white" : "#e9ecef",
              border: "none",
              borderRadius: 6,
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: 14,
              color: hintsRemaining && hintsRemaining > 0 ? "black" : "#6c757d",
              fontFamily: "sans-serif",
              cursor:
                hintsRemaining && hintsRemaining > 0
                  ? "pointer"
                  : "not-allowed",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onClick={handleClick}
            disabled={!hintsRemaining || hintsRemaining <= 0}
          >
            {hintsRemaining && hintsRemaining > 0 ? "Reveal" : "No Hints"}
          </button>
        </>
      )}

      <iframe
        src={src}
        height="152"
        width="400"
        style={{
          borderRadius: 16,
        }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture "
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyObscurer;
