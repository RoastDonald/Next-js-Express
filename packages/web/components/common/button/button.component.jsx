import Link from "next/link";

const Button = (props) => {
  return (
    <div className="my_link">
      <Link className="link_default" href={props.linkTo} {...props.addStyles}>
        {props.title}
      </Link>
    </div>
  );
};

export default Button;
