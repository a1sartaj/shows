const MovieCardSkeleton = () => {
    return (
        <div className="bg-glass-bg rounded-lg overflow-hidden animate-pulse">

            <div className="aspect-[2/3] bg-gray-700" />

            <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-600 rounded w-3/4" />
                <div className="h-3 bg-gray-600 rounded w-1/2" />
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
