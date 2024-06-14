interface ButtonProps {
    label: string;
    className: string;
    handleClick: () => void;
}

/**
 * Button component
 * @param {string} label - The text to display on the button
 * @param {string} className - The class name to apply to the button
 * @param {function} handleClick - The function to call when the button is clicked
 * @returns
 */
const Button = ({ label, className, handleClick }: ButtonProps) => {
    return (
        <button className={`${className}`} onClick={handleClick}>
            {label}
        </button>
    );
};
export default Button;
