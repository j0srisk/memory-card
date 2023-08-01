const Card = ({ animal, gameStatus, isFlipped, onCardClick }) => {
	const handleClick = () => {
		if (gameStatus == 'playing') {
			onCardClick();
		}

		return;
	};

	const handleButtonClick = (e) => {
		e.stopPropagation();
		const animalUrl = e.currentTarget.getAttribute('data-animal-url');
		console.log(animalUrl);
		window.open(animalUrl, '_blank');
	};

	return (
		<div className="card relative transition-all ease-in-out hover:scale-105">
			{/* Card Front */}
			<div
				className={`card-front group relative h-full w-full overflow-hidden ${
					isFlipped ? 'hidden' : 'flex'
				}`}
				onClick={handleClick}
			>
				<div
					style={{
						backgroundImage: `url(${animal.photos[0].full})`,
					}}
					className="flex h-full w-full flex-col justify-end rounded-xl bg-cover bg-center p-4 text-center"
				>
					<div className="z-10 flex select-none flex-col items-center text-white">
						<p className="text-2xl font-bold capitalize">{animal.name}</p>
						<p className="text-sm capitalize">
							{animal.contact.address.city}, {animal.contact.address.state}
						</p>
					</div>
				</div>
				<button
					data-animal-url={animal.url}
					onClick={handleButtonClick}
					className="absolute right-4 top-4 z-10 hidden group-hover:block"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						className="h-6 w-6 fill-none stroke-white"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
						/>
					</svg>
				</button>
				{/* Gradient Overlay */}
				<div className="pointer-events-none absolute left-0 top-0 flex h-full w-full rounded-xl border-4 border-white  bg-gradient-to-b from-transparent to-black"></div>
			</div>
			{/* Card Back */}
			<div
				className={`pointer-events-none absolute left-0 top-0 z-20 ${
					isFlipped ? 'flex' : 'hidden'
				} h-full w-full items-center justify-center rounded-xl border-4 border-white  bg-gray-300`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 292.08 292.08"
					className="w-1/2 fill-white"
				>
					<path d="M146 292.08c-80.53 0-146-65.51-146-146S65.51 0 146 0s146 65.51 146 146-65.44 146.08-146 146.08zM146 26a120 120 0 10120 120A120.17 120.17 0 00146 26z"></path>
					<circle cx="186.83" cy="87.76" r="17.86"></circle>
					<path d="M105.4 192.47c19.53 0 27.81-11.67 27.81-30.35 0-8.25-6.57-15.19-6.57-24.13a20 20 0 0120.45-20.36c12.44 0 20.18 10.51 20.18 20.33 0 9.4-6.59 15.58-6.59 24.29 0 18.69 7.6 30.21 27.73 30.21 16.25 0 24.16-8.8 31.33-19.88 2.37-3.67 6.34-6.61 10.64-6.61 6.49 0 10.1 4.65 10.1 9.78 0 12.22-21 40.38-52.57 40.38-10.88 0-29.57-2.26-40.95-19.93-10.44 16-26.3 19.92-40.74 19.92-33.07 0-52.88-29.25-52.88-40.39a9.71 9.71 0 019.93-9.73 13.55 13.55 0 0110.9 6.61c7.11 11.39 15.75 19.86 31.23 19.86z"></path>
				</svg>
			</div>
		</div>
	);
};

export default Card;
