const Nav = ({ title }) => {
	return (
		<nav className="bg-white border-black border-b-2 font-mono">
			<ul className="flex space-x-4 justify-between">
				<li className="text-black p-4 font-bold">{title}</li>
				<div className="flex space-x-4">
					<li className="text-black hover:bg-gray-400 p-4">
						<a href="/">Home</a>
					</li>
					<li className="text-black hover:bg-gray-400 p-4">
						<a href="/thoughts">Thoughts</a>
					</li>

					<li className="text-black hover:bg-gray-400 p-4">
						<a href="/arch">Archives</a>
					</li>
					<li className="text-black hover:bg-orange-500 p-4">
						<a href="/thoughts/rss.xml">
							<span class="iconify-inline" data-icon="ri:rss-fill"></span>
						</a>
					</li>
				</div>
			</ul>
		</nav>
	);
};

export default Nav;
