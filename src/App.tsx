import React, { useState } from "react";
import "./index.css";

import SpotifyObscurer from "./SpotifyObscurer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 2rem;
  align-self: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  width: 250px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const Tick = styled.div`
  color: #28a745;
  font-size: 2.5rem;
  font-weight: bold;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const InfoIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 8px;
  cursor: pointer;
  position: relative;
`;

const HintsCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #6c757d;
`;

const HintIcon = styled.div<{ used: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props: { used: boolean }) =>
    props.used ? "#dc3545" : "#28a745"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
  transition: all 0.3s ease;
  animation: ${(props: { used: boolean }) =>
    props.used ? "hintUsed 0.5s ease" : "none"};

  @keyframes hintUsed {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const HintsText = styled.span`
  font-weight: 500;
`;

const GuessButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;

  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export function App() {
  const [guessed, setGuessed] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [hintAnimations, setHintAnimations] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const todaysAnswerWord = "red";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleGuess = () => {
    if (inputValue.toLowerCase().includes(todaysAnswerWord.toLowerCase())) {
      setGuessed(true);
      setInputValue("");
    } else {
      // Wrong guess - decrease hints (increase hintsUsed)
      if (hintsUsed < 3) {
        const newHintsUsed = hintsUsed + 1;
        setHintsUsed(newHintsUsed);

        // Trigger animation for the specific hint
        const newAnimations = [...hintAnimations];
        newAnimations[newHintsUsed - 1] = true;
        setHintAnimations(newAnimations);

        // Reset animation after animation completes
        setTimeout(() => {
          const resetAnimations = [...hintAnimations];
          resetAnimations[newHintsUsed - 1] = false;
          setHintAnimations(resetAnimations);
        }, 500);
      }
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  };

  const handleReveal = (index: number) => {
    if (hintsUsed < 3) {
      const newHintsUsed = hintsUsed + 1;
      setHintsUsed(newHintsUsed);

      // Trigger animation for the specific hint
      const newAnimations = [...hintAnimations];
      newAnimations[newHintsUsed - 1] = true;
      setHintAnimations(newAnimations);

      // Reset animation after animation completes
      setTimeout(() => {
        const resetAnimations = [...hintAnimations];
        resetAnimations[newHintsUsed - 1] = false;
        setHintAnimations(resetAnimations);
      }, 500);
    }
  };

  return (
    <div className="app">
      <h1>Music-dle</h1>

      <h3>What connects these songs or artists?</h3>

      <InputContainer>
        {!guessed && (
          <InputRow>
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter your guess..."
            />
            <GuessButton onClick={handleGuess}>Guess</GuessButton>
          </InputRow>
        )}
        {guessed && <Tick>✓</Tick>}
        {guessed && (
          <div>
            You guessed it!
            <p>
              These songs all have <b>{todaysAnswerWord}</b> in common.
            </p>
          </div>
        )}
        {/* Hints counter */}
        {!guessed && (
          <HintsCounter>
            <HintsText>Lives:</HintsText>
            {[0, 1, 2].map((index: number) => (
              <HintIcon
                key={index}
                used={index < hintsUsed}
                style={{
                  animation: hintAnimations[index]
                    ? "hintUsed 0.5s ease"
                    : "none",
                }}
              >
                🎵
              </HintIcon>
            ))}
            <span>({3 - hintsUsed} remaining)</span>
          </HintsCounter>
        )}
      </InputContainer>

      <Container>
        <div>
          <SpotifyObscurer
            src="https://open.spotify.com/embed/track/5jSz894ljfWE0IcHBSM39i?utm_source=generator"
            index={0}
            guessed={guessed}
            onReveal={handleReveal}
            hintsRemaining={3 - hintsUsed}
          />
        </div>
        <div>
          <SpotifyObscurer
            src="https://open.spotify.com/embed/track/2sgBTNHz9ckmqj3rx3ez4M?utm_source=generator"
            index={1}
            guessed={guessed}
            onReveal={handleReveal}
            hintsRemaining={3 - hintsUsed}
          />
        </div>
        <div>
          <SpotifyObscurer
            src="https://open.spotify.com/embed/track/4uOKFydzAejjSFqYbv1XPt?utm_source=generator"
            index={2}
            guessed={guessed}
            onReveal={handleReveal}
            hintsRemaining={3 - hintsUsed}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
