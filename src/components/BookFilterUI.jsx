import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 5;

export default function BookFilterUI({ books }) {
	const [page, setPage] = useState(1);
	const [dateSortOrder, setDateSortOrder] = useState("desc");
	const [importanceSortOrder, setImportanceSortOrder] = useState("desc");
	const [filters, setFilters] = useState({
		text: "",
		author: "",
		year: "",
		importance: "",
		topics: [],
	});

	const filteredBooks = useMemo(() => {
		let result = books;

		// Filter by search text
		if (filters.text) {
			result = result.filter(
				(book) =>
					book.title.toLowerCase().includes(filters.text.toLowerCase()) ||
					book.author.toLowerCase().includes(filters.text.toLowerCase()) ||
					(book.topics &&
						book.topics.some((topic) =>
							topic.toLowerCase().includes(filters.text.toLowerCase())
						))
			);
		}
		// Filter by author
		if (filters.author) {
			result = result.filter((book) => book.author === filters.author);
		}
		// Filter by year
		if (filters.year) {
			result = result.filter((book) => String(book.year) === filters.year);
		}
		// Filter by importance
		if (filters.importance) {
			result = result.filter((book) => book.importance === filters.importance);
		}
		// Sort by year
		result = result
			.slice()
			.sort((a, b) =>
				dateSortOrder === "asc" ? a.year - b.year : b.year - a.year
			);

		// Sort by importance
		result = result.sort((a, b) => {
			const importanceOrder =
				importanceSortOrder === "asc"
					? { high: 3, medium: 2, low: 1 }
					: { high: 1, medium: 2, low: 3 };
			return importanceOrder[a.importance] - importanceOrder[b.importance];
		});

		return result;
	}, [filters, books, dateSortOrder, importanceSortOrder]);

	const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
	const paginatedBooks = filteredBooks.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search books (by title, author, topic)..."
				value={filters.text}
				onChange={(e) => {
					setFilters((prev) => ({ ...prev, text: e.target.value }));
					setPage(1);
				}}
				className="p-2 my-4 w-full"
			/>
			<div className="flex gap-4 mb-4">
				<h1 className="align-middle">Filter By:</h1>
				<select
					className="p-2 flex-1/2"
					value={filters.author}
					onChange={(e) => {
						setFilters((prev) => ({ ...prev, author: e.target.value }));
						setPage(1);
					}}
				>
					<option value="">All Authors</option>
					{[...new Set(books.map((b) => b.author))].sort().map((author) => (
						<option key={author} value={author}>
							{author}
						</option>
					))}
				</select>
				<select
					className="p-2 flex-1/2"
					value={filters.importance}
					onChange={(e) => {
						setFilters((prev) => ({ ...prev, importance: e.target.value }));
						setPage(1);
					}}
				>
					<option value="">All Importance Levels</option>
					<option value="high">&#33;&#33;&#33; Must Read</option>
					<option value="medium">&#33;&#33; Should Read</option>
					<option value="low">&#33; Could Read</option>
				</select>
			</div>
			<div className="flex gap-4 mb-4">
				<h1 className="align-middle">Sort By:</h1>
				<select
					className="p-2 flex-1/4"
					value={dateSortOrder}
					onChange={(e) => setDateSortOrder(e.target.value)}
				>
					<option value="desc">Year: Newest First</option>
					<option value="asc">Year: Oldest First</option>
				</select>
				<select
					className="p-2 flex-1/4"
					value={importanceSortOrder}
					onChange={(e) => setImportanceSortOrder(e.target.value)}
				>
					<option value="desc">Importance: High to Low</option>
					<option value="asc">Importance: Low to High</option>
				</select>
			</div>

			<ul>
				{paginatedBooks.map((book) => (
					<div
						key={book.title + book.year}
						className="grid auto-cols-auto m-6 rounded-lg shadow-md p-4 hover:bg-gray-100 transition-colors duration-200"
					>
						<span>
							<strong>{book.title}</strong> ({book.year})
						</span>
						<span className="italic text-gray-400">{book.author}</span>
						{book.importance == "high" ? (
							<span className="text-red-500 text-sm font-semibold">
								!!! Must Read
							</span>
						) : book.importance == "medium" ? (
							<span className="text-yellow-500 text-sm font-semibold">
								!! Should Read
							</span>
						) : (
							<span className="text-green-500 text-sm font-semibold">
								! Could Read
							</span>
						)}
						{book.topics && book.topics.length > 0 && (
							<span className="text-sm text-gray-500">
								Topics: {book.topics.join(", ")}
							</span>
						)}
						{book.storygraph && (
							<span className="text-right text-sm">
								<a
									href={book.storygraph}
									className="text-blue-600 hover:underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									View on StoryGraph
								</a>
							</span>
						)}
					</div>
				))}
			</ul>

			<div className="mt-4 items-center">
				<button
					className="hover:underline hover:text-blue-600 transition-all duration-200"
					disabled={page === 1}
					onClick={() => handlePageChange(page - 1)}
				>
					Prev
				</button>
				<span className="mx-8">
					Page {page} of {totalPages}
				</span>
				<button
					className="hover:underline hover:text-blue-600 transition-all duration-200"
					disabled={page === totalPages}
					onClick={() => handlePageChange(page + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
}
