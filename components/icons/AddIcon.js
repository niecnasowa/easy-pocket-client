const AddIcon = ({
  width = 24,
  height = 24,
  color = 'base'
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={`fill-current text-${color} hover:text-black`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
};

export default AddIcon;
