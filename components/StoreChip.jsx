const StoreChip = ({ store, callback }) => {
    return (
        <div className="flex flex-row items-center justify-between" onClick={() => callback()}>
            <div className="flex flex-row items-center">
                <img
                    className="w-10 h-10 rounded-full"
                    src="/logo.svg"
                    alt="Workflow"
                />
                <div className="flex flex-col ml-2">
                    <span className="text-sm font-medium text-gray-900">
                        {store.name}
                    </span>
                    <span className="text-sm text-gray-500">
                        {store.city}, {store.state}
                    </span>
                </div>
            </div>
            {/*<div className="flex flex-row items-center">*/}
            {/*                    <span className="text-sm text-gray-500">*/}
            {/*                        0.5 mi*/}
            {/*                    </span>*/}
            {/*</div>*/}
        </div>
    )
}

export default StoreChip