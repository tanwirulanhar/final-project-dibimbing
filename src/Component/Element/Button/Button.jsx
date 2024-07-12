const Button = (props) => {
  return (
    <button
      className={`px-8 py-2 font-bold text-green-600 transition-all duration-200 bg-white border border-green-600 rounded-full hover:bg-green-600 hover:text-white ${props.className}`}
    >
      {props.text}
    </button>
  );
};

export default Button;
