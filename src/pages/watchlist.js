function WatchList() {
    return ( <div className="w-full h-full flex flex-col">
        <div className="w-full text-7xl font-medium text-textWhite  px-8 pt-8">Watchlist</div>
        <div className="w-full px-12 py-4">
            <div className="w-full h-1 rounded-full bg-bgDark"></div>
        </div>
        <div className="w-full grid grid-cols-4 px-6 py-2">
            <div className="w-full aspect-video rounded-xl bg-bgDark"></div>
        </div>
    </div> );
}

export default WatchList;