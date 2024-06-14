interface ButtonProps {
    label: string;
    className: string;
    handleClick: () => void;
}

const Button = ({ label, className, handleClick }: ButtonProps) => {
    return <button className={`${className}`} onClick={handleClick}>{label}</button>;
};
export default Button;
