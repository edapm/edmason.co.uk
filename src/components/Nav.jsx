const Nav = ({ title }) => {
    return (
        <nav className="bg-white border-black border-b-2 font-mono">
            <ul className="flex space-x-4 justify-between">
                <li className="text-black p-4 font-bold">
                    {title}
                </li>
                <div className="flex space-x-4">
                    <li className="text-black hover:bg-gray-400 p-4">
                        <a href="/">Home</a>
                    </li>
                    <li className="text-black hover:bg-gray-400 p-4">
                        <a href="/thoughts">Thoughts</a>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Nav;