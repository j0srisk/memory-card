const SkeletonCard = () => {
	return (
		<div className="card relative transition-all ease-in-out md:hover:scale-105">
			{/* Card Back */}
			<div
				className={`pointer-events-none absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center rounded-xl border-2 border-white bg-gray-300  md:border-4`}
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

export default SkeletonCard;
