const Navlist = () => {
    const navItems = ["Home", "Activity", "Promo "];
    return (
      <>
        {navItems.map((item) => (
          <div
            key={item}
            className="text-lg font-bold hover:-translate-y-1 hover:scale-110 text-green-600 transition-all duration-200 cursor-pointer  hover:border-b-2 hover:border-green-600"
          >
            {item}
          </div>
        ))}
      </>
    );
  };
  
  export default Navlist;
  