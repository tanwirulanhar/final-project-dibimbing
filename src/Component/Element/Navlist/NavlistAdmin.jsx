

const NavlistAdmin = () => {
  const navItems = ["Home", "Activity", "Promo ", "Dashboard"];
  return (
    <>
      {navItems.map((item) => (
        <div
          key={item}
          className="text-lg font-bold text-green-600 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:scale-110 hover:border-b-2 hover:border-green-600"
        >
          {item}
        </div>
      ))}
    </>
  );
};

export default NavlistAdmin;
