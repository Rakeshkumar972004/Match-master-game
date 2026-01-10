import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './SingleCard';

const cardImages = [
  // {"src":"/images/cover image (2).jpg"},
  { "src": "/images/image1 (2) (1) (1).jpg",matched:false},
  { "src": "/images/image 2 (2) (1) (1).jpg",matched:false},
  { "src": "/images/image3 (2) (1) (1).jpg",matched:false },
  { "src": "/images/image4 (1) (1) (1).jpg",matched:false},
  { "src": "/images/image5 (1) (1) (1).jpg",matched:false},
  { "src": "/images/image7 - Copy (1).jpg" ,matched:false} 

]
function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }


  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //compare two selected cards
  useEffect(() => {
    
  if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src === choiceOne.src){
              return {...card,matched:true}
            }else{
              return card

            }
          })
        })
        resetTurn()
      } else {
       
       setTimeout(()=> resetTurn(),1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)
  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns)
    setDisabled(false)
  }

  //start with game automatically
  
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">

      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id}
           card={card}
            handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}>

          </SingleCard>

        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
