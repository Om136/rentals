
const ListingTypeToggle = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-col px-5">
      <span className="text-sm font-medium mb-2">Listing Type</span>
      <div className=" inline-flex bg-gray-100 p-1 rounded-lg w-fit ">
        {["All", "Rent", "Buy"].map((type) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            className={`px-4 py-2 rounded-md transition-all 
              ${
                selected === type
                  ? "bg-white shadow font-semibold"
                  : "text-gray-500"
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListingTypeToggle;
