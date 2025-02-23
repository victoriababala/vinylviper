interface NavigationArrowsProps {
  prevAlbum: () => void;
  nextAlbum: () => void;
}

const NavigationArrows = ({ prevAlbum, nextAlbum }: NavigationArrowsProps) => {
  return (
    <div className="flex gap-6 mt-12 items-center justify-center">
      <button
        onClick={prevAlbum}
        className="p-3 text-white border border-white px-5 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
      >
        {"<"}
      </button>
      <button
        onClick={nextAlbum}
        className="p-3 text-white border border-white px-5 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300"
      >
        {">"}
      </button>
    </div>
  );
};

export default NavigationArrows;
