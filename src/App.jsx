import { useState, useEffect } from 'react';
import axios from 'axios';

import Card from './components/Card';
import SkeletonCard from './components/CardSkeleton';

const App = () => {
	const [animals, setAnimals] = useState([]);
	const [isFlipped, setIsFlipped] = useState(false);
	const [clickedCards, setClickedCards] = useState([]);
	const [score, setScore] = useState(0);
	const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
	const [animalType, setAnimalType] = useState('dog'); // 'dog', 'cat', 'rabbit', 'small-furry', 'horse', 'bird', 'scales-fins-other', 'barnyard'
	const [isLoading, setIsLoading] = useState(true);

	const cards = 6;

	useEffect(() => {
		// Function to fetch data from your API
		setIsLoading(true);

		const fetchAnimals = async () => {
			try {
				const type = animalType;
				const sort = 'random';
				const limit = 20;

				const maxRetries = 3;
				let retries = 0;
				let fetchedAnimals = [];

				// Fetch data from API until we have enough animals
				while (fetchedAnimals.length < 8 && retries < maxRetries) {
					const url = `${
						import.meta.env.VITE_BASE_URL
					}/.netlify/functions/getPetfinderAnimals?type=${type}&sort=${sort}&limit=${limit}`;

					console.log('Fetching animals from:', url);

					const response = await axios.get(url);

					const filteredAnimals = response.data.animals.filter(
						(animal) => animal.photos.length > 0 && animal.name.length < 20, // Adjust the length condition as needed
					);

					fetchedAnimals = fetchedAnimals.concat(filteredAnimals);

					retries++;

					if (retries === maxRetries) alert('Could not fetch enough animals!');
				}

				// Transform data to lowercase
				const transformedAnimals = fetchedAnimals.slice(0, cards).map((animal) => ({
					...animal,
					name: animal.name.toLowerCase(),
					contact: {
						...animal.contact,
						address: {
							...animal.contact.address,
							city: animal.contact.address.city.toLowerCase(),
						},
					},
				}));

				setAnimals(transformedAnimals);
			} catch (error) {
				console.error('Error fetching animals:', error);
				alert('Error fetching animals', error);
			}
			setIsLoading(false);
		};

		fetchAnimals();
		resetGame();
	}, [animalType]);

	// Shuffle cards when isFlipped changes
	useEffect(() => {
		const shuffledAnimals = [...animals];
		for (let i = shuffledAnimals.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledAnimals[i], shuffledAnimals[j]] = [shuffledAnimals[j], shuffledAnimals[i]];
		}
		setAnimals(shuffledAnimals);
	}, [clickedCards]);

	const handleCardClick = (animal) => {
		if (clickedCards.includes(animal)) {
			// Game over
			setGameStatus('lost');
			return;
		} else if (score === animals.length - 1) {
			// Won game
			setGameStatus('won');
			return;
		}
		setIsFlipped(true);
		setClickedCards((prevClickedCards) => [...prevClickedCards, animal]);
		setScore(score + 1);
		setTimeout(() => {
			setIsFlipped(false);
		}, 1000);
	};

	function resetGame() {
		setScore(0);
		setClickedCards([]);
		setGameStatus('playing');
	}

	return (
		<div className="flex h-[100dvh] flex-col items-center justify-between gap-4 p-4 md:gap-8 md:p-8">
			<div className="flex w-full max-w-screen-lg flex-col">
				<div className="flex w-full justify-between">
					<div className="">
						<h1 className="text-2xl font-bold text-white lg:text-4xl">Petfinder Memory Game</h1>
					</div>
					<div className="relative inline-block w-48">
						<select
							id="type"
							name="type"
							value={animalType} // Set the value of select to the animalType state
							onChange={(e) => setAnimalType(e.target.value)} // Update the animalType state on change
							className="block h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-1 font-bold focus:border-indigo-500 focus:outline-none"
						>
							<option value="dog">Dogs</option>
							<option value="cat">Cats</option>
							<option value="rabbit">Rabbits</option>
							<option value="small-furry">Small & Furry</option>
							<option value="horse">Horses</option>
							<option value="bird">Birds</option>
							<option value="scales-fins-other">Scales, Fins & Other</option>
							<option value="barnyard">Barnyard</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex h-full items-center px-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								className="h-4 w-4 stroke-current"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>
				</div>

				<div className="w-full justify-start">
					{gameStatus === 'won' && <h2 className="mb-8 text-lg text-white">Game Over! You Win!</h2>}
					{gameStatus === 'lost' && (
						<h2 className="text-md text-white lg:text-lg">
							Game Over! You already selected that card. Final Score: {score}
						</h2>
					)}
					{gameStatus === 'playing' && score > 0 && (
						<h2 className="text-md text-white lg:text-lg">Current Score: {score}</h2>
					)}
					{gameStatus === 'playing' && score === 0 && (
						<h2 className="text-md text-white lg:text-lg">
							Click a card to start and earn points, but don&apos;t click on any more than once!
						</h2>
					)}
				</div>
			</div>
			<div className="grid h-full w-full max-w-screen-lg grid-flow-row grid-cols-3 grid-rows-2 gap-4 lg:gap-8">
				{isLoading
					? [...Array(cards)].map((_, i) => <SkeletonCard key={i} />)
					: animals.map((animal) => (
							<Card
								key={animal.id}
								animal={animal}
								gameStatus={gameStatus}
								isFlipped={isFlipped}
								setIsFlipped={setIsFlipped}
								onCardClick={() => handleCardClick(animal)}
							/>
					  ))}
			</div>
		</div>
	);
};

export default App;
