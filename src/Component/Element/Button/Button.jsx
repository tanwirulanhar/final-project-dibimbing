const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`px-6 py-2 font-semibold cursor-pointer text-green-600 transition-all duration-200 bg-white border border-green-600 rounded-full hover:bg-green-600 hover:text-white ${props.className} ${props.marginClass}`}
    >
      {props.text}
    </button>
  );
};

export default Button;
